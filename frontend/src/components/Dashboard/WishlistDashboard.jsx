import { useEffect, useState } from "react";
import { useGetLikedProductsQuery } from "../../store/slices/api/userApiSlice";
import Loader from "../UI/Loader";
import Message from "../UI/Message";
import ProductCard from "../Product/ProductCard";
import SEOMeta from "../Util/SEOMeta";

function WishlistDashboard({ userId }) {
  const [likedProducts, setLikedProducts] = useState([]);

  const { data, isLoading, error } = useGetLikedProductsQuery({ userId });

  useEffect(() => {
    setLikedProducts(data?.likedProducts);
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <>
      <SEOMeta title=" لیست علاقه مندی ها | بارین مارکت" />
      {!likedProducts || likedProducts.length === 0 ? (
        <div className="m-5">
          <Message>هنوز محصولی را به لیست علاقه‌مندی‌ها اضافه نکردید</Message>
        </div>
      ) : (
        <>
          <div className="flex-1 my-6 mx-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedProducts.map((like) => {
                return (
                  <ProductCard product={like.product} key={like.product._id} />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default WishlistDashboard;
