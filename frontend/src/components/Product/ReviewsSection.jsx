import { useState } from "react";
import { useSelector } from "react-redux";
import { toPersianDate } from "../../utils/toPersianDate";
import { FaRegStar, FaStar, FaThumbsUp } from "react-icons/fa";
import Message from "../UI/Message";
import ReviewForm from "./ReviewForm";

function ReviewsSection({ product, refetchProduct }) {
  const [reviewSort, setReviewSort] = useState("newest");

  const { userInfo } = useSelector((state) => state.auth);

  const sortedReviews = [...(product?.reviews || [])].sort((a, b) => {
    if (reviewSort === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (reviewSort === "highest") {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  return (
    <div className="mt-12 rounded-box border overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 pb-2 border-b border-base-200">
          نظرات مشتریان
        </h2>

        {product.reviews.length === 0 ? (
          <Message type="info">هنوز نظری برای این محصول ثبت نشده است</Message>
        ) : (
          <div className="space-y-6">
            {/* Review Sorting */}
            <div className="flex justify-end">
              <div className="form-control">
                <select
                  className="select select-bordered select-sm"
                  value={reviewSort}
                  onChange={(e) => setReviewSort(e.target.value)}
                  aria-label="مرتب‌سازی نظرات"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="highest">بالاترین امتیاز</option>
                  <option value="lowest">پایین‌ترین امتیاز</option>
                </select>
              </div>
            </div>

            {sortedReviews.map((review) => (
              <div
                key={review._id}
                className="border-b border-base-200 pb-6 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex items-center my-2">
                      {[...Array(5)].map((_, i) =>
                        i < review.rating ? (
                          <FaStar
                            key={i}
                            className="text-yellow-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <FaRegStar
                            key={i}
                            className="text-yellow-400"
                            aria-hidden="true"
                          />
                        )
                      )}
                      <span className="sr-only">
                        امتیاز: {review.rating} از 5
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-neutral">
                    {toPersianDate(review.createdAt)}
                  </span>
                </div>
                <p className="mt-2 text-neutral">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Review Form */}
        <ReviewForm
          userInfo={userInfo}
          product={product}
          refetch={refetchProduct}
        />
      </div>
    </div>
  );
}

export default ReviewsSection;
