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

function ReviewCard({ review, userId, refetchReviews, isLoadingReviews }) {
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
    // try {
    //   await editReview({ newComment, newRating, userId, reviewId }).unwrap();
    //   refetchReviews();
    //   toast.success("نظر با موفقیت تغییر یافت ");
    // } catch (error) {
    //   toast.error("تغییر نظر با با شکست مواجه شد. مجددا تلاش کنید.");
    // }
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
          <Button size="sm" onClick={() => handleEditComment(review)}>
            ویرایش
          </Button>
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
