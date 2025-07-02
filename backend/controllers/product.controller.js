import Product from "../models/product.model.js";
import { newError } from "../utils/errorHandler.js";
import { deleteFromArvan, uploadToArvan } from "../config/s3config.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSortOptions } from "../utils/getSortOptions.js";
import mongoose from "mongoose";
import sharp from "sharp";
import { fetchImageBuffer } from "../utils/fetchImageBuffer.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

/*
  @desc    Get all products with filtering and pagination
  @route   GET /api/products
  @access  Public
 */
async function getProducts(req, res, next) {
  const pageSize = Number(process.env.PAGINATION_LIMIT) || 8;
  const page = Number(req.query.page) || 1;

  // Validate page number
  if (page < 1) {
    return res.status(400).json({ message: "شماره صفحه حداقل باید یک باشد" });
  }

  // Build query filters
  const filters = {};

  // Keyword search (case-insensitive)
  if (req.query.keyword && req.query.keyword.trim() !== "") {
    const keyword = req.query.keyword.trim();
    filters.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { brand: { $regex: keyword, $options: "i" } },
    ];
  }

  // Category filter
  if (req.query.category && req.query.category !== "null") {
    filters.category = req.query.category;
  }

  // Brand filter
  if (req.query.brand && req.query.brand !== "null") {
    filters.brand = req.query.brand;
  }

  // Price filter (max price)
  if (req.query.price && req.query.price !== "null") {
    const priceNum = Number(req.query.price);
    if (!isNaN(priceNum)) {
      filters.price = { $lte: priceNum };
    }
  }

  // Rating filter (min rating)
  if (req.query.rating && req.query.rating !== "null") {
    const ratingNum = Number(req.query.rating);
    if (!isNaN(ratingNum) && ratingNum >= 0 && ratingNum <= 5) {
      filters.rating = { $gte: ratingNum };
    }
  }

  // Get total count of matching products
  const productCount = await Product.countDocuments(filters);

  // Calculate total pages
  const pages = Math.ceil(productCount / pageSize);

  // Validate requested page
  if (page > pages && pages > 0) {
    return res.status(400).json({
      message: `صفحه ${page} وجود ندرد. فقط ${pages} صفحه وجود دارد.`,
    });
  }

  const products = await Product.find(filters)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(getSortOptions(req.query.sort));

  if (!products || products.length === 0) {
    return res.status(200).json({
      products: [],
      page,
      pages,
      count: 0,
      message: "هیچ محصولی با مشخصات داده شده یافت نشد",
    });
  }

  res.status(200).json({
    products,
    page,
    pages,
    count: productCount,
  });
}

/*
  @desc    Get all available filter options (categories, brands, price range)
  @route   GET /api/product/filters
  @access  Public
 */
async function getProductFilters(req, res, next) {
  // 🏷️ Get all unique categories
  const categories = await Product.distinct("category");

  // 🏭 Get all unique brands
  const brands = await Product.distinct("brand");

  // 💰 Get price range (min and max prices)
  const priceRange = await Product.aggregate([
    {
      $group: {
        _id: null,
        max: { $max: "$price" }, // Maximum price in collection
        min: { $min: "$price" }, // Minimum price in collection
      },
    },
  ]);

  // 🚀 Send filter options
  res.status(200).json({
    categories, // Array of all category names
    brands, // Array of all brand names
    priceRange: priceRange[0] || { max: 0, min: 0 }, // Price range object
  });
}

// @desc    Fetch Specific Product
// @route   GET /api/products/:id
// @access  Public
async function getProductById(req, res, next) {
  const { id } = req.params;
  const product = await Product.findById(id).populate("reviews");

  if (!product) {
    next(newError(404, "محصول پیدا نشد"));
  }
  res.status(200).json(product);
}

// @desc    Create a Product
// @route   POST /api/product
// @access  Private/Admin
async function createProduct(req, res, next) {
  const product = new Product({
    name: "نام نمونه",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "برند نمونه",
    category: "دسته‌بندی نمونه",
    countInStock: 0,
    numReviews: 0,
    description: "توضیحات نمونه",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
}

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private/Admin
async function updateProduct(req, res, next) {
  const { name, price, description, images, brand, category, countInStock } =
    req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.images = images;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } else {
    return next(newError(404, "محصولی با این شناسه پیدا نشد"));
  }
}

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
async function deleteProduct(req, res, next) {
  const { id } = req.params;
  if (!id) return next(newError(404, "پارامتر درخواست پیدا نشد"));
  await Product.findByIdAndDelete(id);
  res.status(200).json({ message: "محصول با موفقیت حذف شد" });
}

// @desc    upload Product images
// @route   POST /api/product/:id/images
// @access  Private/Admin
async function uploadProductImages(req, res, next) {
  if (!req.file) return next(newError(404, "هیچ فایلی آپلود نشده است"));

  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return next(new Error("Invalid product ID", 400));
  }

  const { buffer, originalName } = req.file;
  if (!buffer) return next(newError(404, "بافر فایلی موجود نیست"));

  const LOGO_URL =
    "https://ecommerce-v1.s3.ir-thr-at1.arvanstorage.ir/Default%2Fwatermark-logo.png?versionId=";

  try {
    const logoBuffer = await fetchImageBuffer(LOGO_URL);

    const compressedImageBuffer = await sharp(buffer)
      .composite([
        {
          input: logoBuffer,
          gravity: "southeast",
          opacity: 0.5,
        },
      ])
      .resize(800, 800, { fit: "inside" })
      .toFormat("webp")
      .webp({ quality: 80 })
      .toBuffer();

    const fileUrl = await uploadToArvan(compressedImageBuffer, id);

    res.status(200).json({
      message: "تصویر با موفقیت آپلود شد",
      url: fileUrl,
    });
  } catch (error) {
    console.error("خطای آپلود S3:", error);
    next(newError(500, `آپلود فایل ناموفق بود`));
  }
}

// @desc    Delete Product images
// @route   DELETE /api/product/:id/images
// @access  Private/Admin
async function deleteProductImages(req, res, next) {
  const { id } = req.params;
  const { imageUrl } = req.query;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return next(newError(404, "محصولی یافت نشد"));
    }

    // Filter out the images to be deleted
    console.log("1");
    product.images = product.images.filter((img) => imageUrl !== img);
    console.log("2");
    await product.save();
    console.log("3");

    await deleteFromArvan(imageUrl);
    console.log("4");

    res.status(200).json({
      message: "عکس ها با موفقیت حذف شدند",
      product,
    });
  } catch (error) {
    next(newError(500, "حذف عکس ها با شکست مواجه شد"));
  }
}

// TEST
// @desc    Add Image Urls to Product
// @route   PUT /api/product/:id/
// @access  Private/Admin
async function addProductImages(req, res, next) {
  const { id } = req.params;
  const { urls } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return next(newError(404, "محصولی یافت نشد"));
    }

    product.images = [...product.images, ...urls];
    await product.save();

    res.status(200).json({
      message: "عکس ها با موفقیت اضافه شدند",
      product,
    });
  } catch (error) {
    next(newError(500, "اضافه کردن عکس ها با شکست مواجه شد."));
  }
}

// @desc    Get Top Rated Products
// @route   GET /api/product/top
// @access  Public
async function getTopProducts(req, res, next) {
  const products = await Product.find().sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
}

// @desc    Add User Like to Product
// @route   POST /api/product/:productId/:userId/like
// @access  Private
async function likeProduct(req, res, next) {
  const { productId, userId } = req.params;

  const user = await User.findById(userId);
  if (!user) return next(newError(404, "کاربری پیدا نشد"));
  if (req.user._id.toString() !== userId)
    return next(newError(400, "مجاز به این کار نمیباشید."));

  const product = await Product.findById(productId);
  if (!product) return next(newError(404, "محصولی یافت نشد."));

  if (product.likes.includes(user._id))
    return next(
      newError(400, "شما قبلا این محصول را به علاقه مندی ها اضافه کردید.")
    );

  product.likes.push({ user: user._id });
  product.numLikes = product.numLikes ? product.numLikes + 1 : 1;
  await product.save();

  user.likes.push({ product: product._id });
  await user.save();

  res
    .status(202)
    .json({ message: "با موفقیت به لیست علاقه مندی ها اضافه شد." });
}

// @desc    Remove User Like from Product
// @route   DELETE /api/product/:productId/:userId/like
// @access  Private
async function removeProductLike(req, res, next) {
  const { productId, userId } = req.params;

  const user = await User.findById(userId);
  if (!user) return next(newError(404, "کاربری پیدا نشد"));
  if (req.user._id.toString() !== userId)
    return next(newError(400, "مجاز به این کار نمیباشید."));

  const product = await Product.findById(productId);
  if (!product) return next(newError(404, "محصولی یافت نشد."));

  if (
    !product.likes.some((like) => user._id.toString() === like.user.toString())
  ) {
    return next(newError(400, "این محصول جز لیست علاقه مندی های شما نیست"));
  }

  await User.updateOne(
    { _id: userId },
    { $pull: { likes: { product: product._id } } }
  );
  await Product.updateOne(
    { _id: productId },
    { $pull: { likes: { user: user._id } } }
  );

  product.numLikes = product.numLikes && product.numLikes - 1;
  await product.save();

  res.status(200).json({ message: "با موفقیت از لیست علاقه مندی ها حذف شد." });
}

export {
  getProducts,
  getProductFilters,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  uploadProductImages,
  getTopProducts,
  addProductImages,
  deleteProductImages,
  likeProduct,
  removeProductLike,
};
