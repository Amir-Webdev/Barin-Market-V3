import { useEffect, useState } from "react";
import { formatNumber, toPersianDigits } from "../../utils/toPersianDigits";
import Rating from "./Rating";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import useAddToCart from "../../hooks/useAddToCart";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useAddLikeMutation,
  useRemoveLikeMutation,
} from "../../store/slices/api/productApiSlice";
import { HiOutlineHeart } from "react-icons/hi2";

function ProductInfo({ product, productId }) {
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setQuantity(1);
  }, [productId, product?.countInStock]);

  const addToCart = useAddToCart();
  function addToCartHandler() {
    addToCart({ ...product, quantity });
  }

  useEffect(() => {
    if (product)
      if (product.likes.some((like) => like.user === userInfo._id))
        setWishlist(true);
  }, [product, userInfo]);

  async function handleLikeProduct() {
    try {
      await addLike({ userId: userInfo._id, productId: product._id }).unwrap();
      setWishlist(true);
    } catch (err) {
      toast.error(
        "اضافه کردن به لیست علاقه مندی ها با شکست مواجه شد. مجددا تلاش کنید."
      );
    }
  }

  const [removeLike, { isLoading: isRemovingLike }] = useRemoveLikeMutation();

  const [addLike, { isLoading: isAddingLike }] = useAddLikeMutation();

  async function handleRemoveLikeProduct() {
    try {
      await removeLike({
        userId: userInfo._id,
        productId: product._id,
      }).unwrap();
      setWishlist(false);
    } catch (error) {
      toast.error(
        "حذف کردن از لیست علاقه مندی ها با شکست مواجه شد. مجددا تلاش کنید."
      );
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center mt-5">
          <Rating value={product.rating} />
          <span className="text-sm text-neutral font-semibold mr-4">
            {toPersianDigits(product.numReviews)} نظر
          </span>
        </div>
        <p className="text-2xl font-bold mt-5">
          {formatNumber(product.price)}
          <span className="text-xl"> تومان</span>
        </p>
        <p className="font-semibold text-base mt-1">
          وضعیت :{" "}
          <span className="text-primary">
            {product.countInStock ? "موجود" : "ناموجود"}
          </span>
        </p>
      </div>

      <div>
        <p
          className={`text-text-secondary font-semibold leading-relaxed ${
            showInfo && "line-clamp-3"
          }`}
        >
          {product.description.length > 75
            ? product.description.substring(0, 75)
            : product.description}
          {product.description.length > 75 && (
            <span
              onClick={() => setShowInfo((cur) => !cur)}
              className="text-primary/75 mr-1
          "
            >
              مشاهده بیشتر...
            </span>
          )}
        </p>
      </div>

      <div className="divider"></div>

      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-green-600"></div>
        <div className="h-8 w-8 rounded-full bg-blue-600"></div>
        <div className="h-8 w-8 rounded-full bg-yellow-600"></div>
        <div className="h-8 w-8 rounded-full bg-red-600"></div>
        <div className="h-8 w-8 rounded-full bg-black"></div>
      </div>

      {product.countInStock > 0 && (
        <div className="flex items-center justify-start gap-4 mt-14">
          <Button onClick={addToCartHandler} aria-label="افزودن به سبد خرید">
            <FaShoppingCart className="ml-2" />
            افزودن به سبد
          </Button>
          <button
            onClick={() =>
              userInfo &&
              (wishlist ? handleRemoveLikeProduct() : handleLikeProduct())
            }
            disabled={isAddingLike || isRemovingLike}
            className={`btn btn-circle btn-md ${wishlist ? "btn-error" : ""}`}
            aria-label={
              wishlist ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
            }
          >
            <HiOutlineHeart size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
