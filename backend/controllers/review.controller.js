import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import { newError } from "../utils/errorHandler.js";

// @desc    Delete Product Review
// @route   DELETE /api/review/:userId
// @access  Private
async function deleteReview(req, res, next) {
  const userIdFromCookie = req.user._id.toString();
  const { userId: userIdFromParams } = req.params;
  const { productId, reviewId } = req.body;

  if (userIdFromCookie !== userIdFromParams)
    return next(newError(403, "مجاز به حذف این نظر نیستید"));

  if (!userIdFromParams || !productId || !reviewId)
    return next(newError(400, "یک یا چند پارامتر مورد نیاز موجود نیست"));

  await User.updateOne(
    { _id: userIdFromParams },
    { $pull: { reviews: reviewId } }
  );
  await Product.updateOne({ _id: productId }, { $pull: { reviews: reviewId } });
  await Review.deleteOne({ _id: reviewId });

  res.status(200).json({ message: "نظر با موفقیت حذف شد" });
}

// @desc    Create New Product Review
// @route   POST /api/review/:productId
// @access  Private
async function createProductReview(req, res, next) {
  const { rating, comment } = req.body;
  const { productId } = req.params;

  if (!productId) return next(newError(404, "پارامتر درخواست پیدا نشد"));

  const product = await Product.findById(productId);

  const user = await User.findById(req.user.id);

  if (product) {
    const productReviews = await Review.find({ product: productId });

    const alreadyReviewed = product.reviews.find((review) => {
      return review.user.id.toString() === req.user._id.toString();
    });

    if (alreadyReviewed)
      return next(newError(400, "محصول قبلاً بررسی شده است"));

    if (!rating || typeof rating !== "number") {
      return next(newError(400, "مقدار داده شده به امتیاز مجاز نیست."));
    }

    const review = new Review({
      user: { _id: req.user._id },
      product: product.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    });

    const newReview = await review.save();

    user.reviews.push(newReview.id);
    await user.save();

    product.reviews.push(newReview.id);

    product.numReviews = product.reviews.length;

    const allReviews = await Review.find({ product: product._id });

    product.rating =
      allReviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "بررسی اضافه شد" });
  } else {
    return next(newError(404, "محصولی پیدا نشد"));
  }
}

// @desc    Get User Reviews
// @route   GET /api/review/reviews
// @access  Private
async function getUserReviews(req, res, next) {
  const user = await User.findById(req.user._id);

  if (!user) return next(newError("404", "کاربری یافت نشد"));

  const populatedUser = await user.populate({
    path: "reviews",
    select: "product user createdAt comment rating",
    populate: {
      path: "product",
      select: "name images",
    },
  });

  if (!populatedUser)
    return next(
      newError("400", "دریافت نظرات با مشکلی مواجه شد. مجددا تلاش کنید.")
    );

  res.status(200).json(populatedUser.reviews);
}

// @desc    Edit Product Review
// @route   PUT /api/review/:userId/:reviewId
// @access  Private
async function editReview(req, res, next) {
  const userIdFromCookie = req.user._id.toString();
  const { userId: userIdFromParams } = req.params;
  const { newComment, reviewId } = req.body;

  if (userIdFromCookie !== userIdFromParams)
    return next(newError(403, "مجاز به حذف این نظر نیستید"));

  if (!userIdFromParams || !productId || !reviewId)
    return next(newError(400, "یک یا چند پارامتر مورد نیاز موجود نیست"));

  const review = await Review.findById(reviewId);

  if (!review) return next(newError(404, "نظر یافت نشد"));

  review.comment = newComment;

  const updatedReview = await review.save();

  if (!updatedReview)
    return next(newError(400, "مشکلی در تغییر نظر بوجود آمد. مجددا تلاش کنید"));

  res.status(202).json({ status: success });
}

export { deleteReview, createProductReview, getUserReviews, editReview };
