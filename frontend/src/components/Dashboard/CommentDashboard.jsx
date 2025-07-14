import { useGetUserReviewsQuery } from "../../store/slices/api/userApiSlice";
import Loader from "../UI/Loader";
import Message from "../UI/Message";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import SEOMeta from "../Util/SEOMeta";

function CommentDashboard({ userId }) {
  const [reviews, setReviews] = useState([]);

  const {
    data,
    isLoading: isLoadingReviews,
    refetch,
    error,
  } = useGetUserReviewsQuery();

  useEffect(() => {
    if (data) setReviews(data);
  }, [data]);

  if (isLoadingReviews) return <Loader size="xl" />;

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

  return (
    <>
      <SEOMeta title=" نظرات کاربر | بارین مارکت" />
      <div className="flex-1 my-6 mx-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              userId={userId}
              refetchReviews={refetch}
              isLoadingReviews={isLoadingReviews}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default CommentDashboard;
