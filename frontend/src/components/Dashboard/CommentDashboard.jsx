import { FaStar } from "react-icons/fa";
import {
  useDeleteUserReviewMutation,
  useGetUserReviewsQuery,
} from "../../store/slices/api/userApiSlice";
import Loader from "../UI/Loader";
import Message from "../UI/Message";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import { toPersianDate } from "../../utils/toPersianDate";
import Rating from "../Product/Rating";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import { toast } from "react-toastify";

function CommentDashboard({ userId }) {
  const [reviews, setReviews] = useState([]);

  const { data, isLoading, refetch, error } = useGetUserReviewsQuery();

  const [deleteReview, { isLoading: isDeleting, error: deleteReviewError }] =
    useDeleteUserReviewMutation();

  useEffect(() => {
    if (data) setReviews(data);
  }, [data]);

  async function handleDeleteComment(reviewId, productId) {
    try {
      await deleteReview({ userId, reviewId, productId }).unwrap();
      refetch();
      toast.success("نظر با موفقیت حذف شد");
    } catch (error) {
      toast.error("حذف نظر با با شکست مواجه شد. مجددا تلاش کنید.");
    }
  }

  async function handleEditComment() {}

  if (isLoading) return <Loader size="xl" />;

  if (error)
    return (
      <div className="p-4">
        <Message type="error">هنوز نظری ثبت نشده است.</Message>
      </div>
    );

  if (!reviews || reviews.length === 0)
    return (
      <div className="p-4">
        <Message>هنوز نظری ثبت نشده است.</Message>
      </div>
    );

  console.log(reviews);
  return (
    <div className="flex-1 my-6 mx-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="card bg-base-100 shadow-md border border-base-300 transition hover:shadow-lg"
          >
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
                  isLoading={isLoading}
                  onConfirm={() =>
                    handleDeleteComment(review._id, review.product._id)
                  }
                >
                  حذف
                </Modal>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentDashboard;
