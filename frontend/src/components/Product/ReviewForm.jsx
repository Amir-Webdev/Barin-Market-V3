import { toast } from "react-toastify";
import { useCreateReviewMutation } from "../../store/slices/api/productApiSlice";
import Loader from "../UI/Loader";
import { useState } from "react";

function ReviewForm({ product, userInfo, refetch }) {
  const [review, setReview] = useState({
    productId: product._id,
    comment: "",
    rating: 0,
  });

  const [createReview, { isLoading: isCreatingReview }] =
    useCreateReviewMutation();

  async function submitReviewHandler(e) {
    e.preventDefault();
    try {
      if (!review.rating) {
        toast.warning("لطفاً به محصول امتیاز دهید");
        return;
      }
      await createReview(review).unwrap();
      toast.success("نظر شما با موفقیت ثبت شد");
      setReview({ productId: product._id, comment: "", rating: 0 });
      refetch();
    } catch (error) {
      toast.error(error.data?.message || error.error || "خطا در ثبت نظر");
    }
  }

  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold mb-4">ثبت نظر جدید</h3>

      {isCreatingReview && <Loader />}

      {userInfo ? (
        <form onSubmit={submitReviewHandler}>
          <div className="grid md:grid-cols-4 gap-6">
            <label className="label">
              <span className="label-text">امتیاز شما به این محصول</span>
            </label>
            <select
              className="select select-bordered col-span-3"
              value={review.rating}
              onChange={(e) =>
                setReview({
                  ...review,
                  rating: Number(e.target.value),
                })
              }
              required
              aria-label="امتیاز به محصول"
            >
              <option value="">لطفاً انتخاب کنید</option>
              <option value="1">۱ - ضعیف</option>
              <option value="2">۲ - قابل قبول</option>
              <option value="3">۳ - خوب</option>
              <option value="4">۴ - خیلی خوب</option>
              <option value="5">۵ - عالی</option>
            </select>

            <label className="label">
              <span className="label-text">متن نظر</span>
            </label>
            <textarea
              className="textarea bg-white border h-32 col-span-3"
              placeholder="تجربه خود از استفاده این محصول را بنویسید..."
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
              required
              minLength="10"
              aria-label="متن نظر"
            ></textarea>

            <div className="">
              <button
                type="submit"
                className="btn btn-success"
                disabled={isCreatingReview}
                aria-label="ثبت نظر"
              >
                {isCreatingReview ? "در حال ارسال..." : "ثبت نظر"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <Message>
          برای ثبت نظر لطفاً{" "}
          <Link to="/login" className="link link-primary">
            وارد حساب کاربری
          </Link>{" "}
          خود شوید یا{" "}
          <Link to="/register" className="link link-primary">
            ثبت‌نام
          </Link>{" "}
          کنید.
        </Message>
      )}
    </div>
  );
}

export default ReviewForm;
