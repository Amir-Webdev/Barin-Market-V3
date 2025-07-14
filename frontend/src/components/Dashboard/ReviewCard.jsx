import { Link } from "react-router-dom";
import { toPersianDate } from "../../utils/toPersianDate";
import Rating from "../Product/Rating";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import {
  useDeleteUserReviewMutation,
  useEditUserReviewMutation,
} from "../../store/slices/api/userApiSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function ReviewCard({ review, userId, refetchReviews, isLoadingReviews }) {
  const [reviewState, setReviewState] = useState({
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    setReviewState({
      rating: review.rating,
      comment: review.comment,
    });
  }, [review]);

  const [deleteReview, { isLoading: isDeleting }] =
    useDeleteUserReviewMutation();

  const [editReview, { isLoading: isEditing }] = useEditUserReviewMutation();

  async function handleDeleteComment(reviewId, productId) {
    try {
      await deleteReview({ userId, reviewId, productId }).unwrap();
      refetchReviews();
      toast.success("نظر با موفقیت حذف شد");
    } catch (error) {
      toast.error("حذف نظر با با شکست مواجه شد. مجددا تلاش کنید.");
    }
  }

  async function handleEditComment(reviewId) {
    try {
      await editReview({
        newComment: reviewState.comment,
        newRating: reviewState.rating,
        userId,
        reviewId,
      }).unwrap();
      refetchReviews();
      document.getElementById("editReviewFormModal").close();
      toast.success("نظر با موفقیت تغییر یافت ");
    } catch (error) {
      toast.error("تغییر نظر با با شکست مواجه شد. مجددا تلاش کنید.");
    }
  }
  return (
    <div className="card bg-base-100 shadow-md border border-base-300 transition hover:shadow-lg">
      <div className="card-body p-4">
        <Link to={`/product/${review.product._id}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <img
              src={review.product?.images?.[0]}
              alt={review.product?.name}
              className="w-full sm:w-20 h-20 object-cover rounded-xl border"
            />
            <div className="text-start space-y-1">
              <h2 className="font-semibold text-lg">
                {review.product?.name || "محصول حذف شده"}
              </h2>
              <p className="text-sm text-gray-400">
                تاریخ ایجاد: {toPersianDate(review.createdAt)}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex items-center mb-2">
          <Rating value={review.rating} />
        </div>

        <p className="mb-4 text-sm line-clamp-3">{review.comment}</p>

        <div className="flex flex-wrap justify-end gap-2">
          <Button
            size="sm"
            onClick={() =>
              document.getElementById("editReviewFormModal").showModal()
            }
          >
            ویرایش
          </Button>
          <dialog id="editReviewFormModal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">ویرایش نظر</h3>
              <div className="modal-action">
                <form method="dialog">
                  <div className="grid md:grid-cols-4 gap-6">
                    <label className="label">
                      <span className="text-wrap">امتیاز شما به این محصول</span>
                    </label>
                    <select
                      className="select bg-background border border-border col-span-3"
                      value={reviewState.rating}
                      onChange={(e) =>
                        setReviewState((cur) => {
                          return {
                            ...cur,
                            rating: Number(e.target.value),
                          };
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
                      className="textarea bg-background border border-border h-32 col-span-3"
                      placeholder="تجربه خود از استفاده این محصول را بنویسید..."
                      value={reviewState.comment}
                      onChange={(e) =>
                        setReviewState((cur) => {
                          return { ...cur, comment: e.target.value };
                        })
                      }
                      required
                      minLength="10"
                      aria-label="متن نظر"
                    ></textarea>
                    <div className="flex gap-2">
                      <Button
                        color="green"
                        size="sm"
                        onClick={() => handleEditComment(review._id)}
                        disabled={isEditing}
                      >
                        ویرایش
                      </Button>
                      <Button
                        color="red"
                        size="sm"
                        disabled={isEditing}
                        onClick={() =>
                          document.getElementById("editReviewFormModal").close()
                        }
                      >
                        لغو
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
          <Modal
            id="Delete_Comment_Modal"
            title="حذف نظر"
            text="آیا از حذف این نظر مطمئن هستید؟"
            modalButtonColor="red"
            modalButtonSize="sm"
            confirmText="بله حذف کن"
            cancelText="لغو"
            isLoading={isLoadingReviews && isDeleting}
            onConfirm={() =>
              handleDeleteComment(review._id, review.product._id)
            }
          >
            حذف
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
