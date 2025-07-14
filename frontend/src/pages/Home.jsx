import ProductCard from "../components/Product/ProductCard";
import { useGetProductsQuery } from "../store/slices/api/productApiSlice.js";
import Loader from "../components/UI/Loader.jsx";
import { Link, useParams } from "react-router-dom";
import ProductsCarousel from "../components/Product/ProductsCarousel.jsx";
import SEOMeta from "../components/Util/SEOMeta.jsx";
import Message from "../components/UI/Message.jsx";
import { FaArrowLeft } from "react-icons/fa";
import Categories from "../components/Categories.jsx";

function Home() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      <SEOMeta
        title="به فروشگاه بارین مارکت خوش آمدید"
        description="جدیدترین محصولات و تخفیف‌ها را در فروشگاه ما کشف کنید."
        keywords="فروشگاه اینترنتی, محصولات, تخفیف‌ها, خرید"
        canonical={window.location.href}
        openGraph={{
          title: "به فروشگاه بارین مارکت خوش آمدید",
          description: "جدیدترین محصولات و تخفیف‌ها را در فروشگاه ما کشف کنید.",
          url: window.location.href,
        }}
      />

      <div className="container mx-auto px-8 py-5 text-end">
        <ProductsCarousel />
        <Categories />
        <div className="flex items-center justify-between">
          <h1 className="mb-4 text-2xl font-bold text-right">آخرین محصولات</h1>
          <Link
            to="/products"
            className="text-primary flex items-center text-sm hover:underline "
          >
            مشاهده همه
            <FaArrowLeft className="mr-1" size={14} />
          </Link>
        </div>
        {isLoading ? (
          <div className="text-center">
            <Loader />
            <p>در حال بارگذاری محصولات...</p>
          </div>
        ) : error ? (
          <Message type="error">
            {error?.data?.message || error?.error || "خطا در بارگذاری محصولات"}
          </Message>
        ) : (
          <>
            <div className="flex flex-wrap mx-4">
              {data.products.length >= 1 ? (
                data.products.map((product) => (
                  <div
                    key={product._id}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4"
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="w-full">
                  <div className="alert alert-info text-end">
                    محصولی یافت نشد
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
