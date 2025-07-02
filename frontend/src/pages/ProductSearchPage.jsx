// ProductsPage.jsx
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../store/slices/api/productApiSlice";
import ProductCard from "../components/Product/ProductCard";
import Paginate from "../components/UI/Paginate";
import FilterSidebar from "../components/Search/FilterSidebar";
import Loader from "../components/UI/Loader";
import { FaFilter } from "react-icons/fa";
import SEOMeta from "../components/Util/SEOMeta";
import Message from "../components/UI/Message";
import NoResults from "../components/UI/NoResults";
import { formatNumber } from "../utils/toPersianDigits";

const ProductSearchPage = () => {
  const { keyword } = useParams();
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: null,
    brand: null,
    price: null,
    rating: null,
    sort: null,
  });

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters, keyword]);

  const {
    data: productsData,
    isLoading,
    isError,
    isFetching,
  } = useGetProductsQuery({
    keyword,
    page,
    ...filters,
  });

  return (
    <>
      <SEOMeta
        title={`محصولات ${
          keyword ? `- نتایج جستجو برای ${keyword}` : ""
        } | بارین مارکت`}
        description="مرجع خرید محصولات با بهترین قیمت و کیفیت"
        keywords="فروشگاه اینترنتی, خرید آنلاین, بارین مارکت, محصولات"
      />

      <div className="container mx-auto px-4 py-6 relative">
        {/* Mobile Filter Button - Sticky */}
        <div className="md:hidden sticky top-16 z-40 bg-white py-2 mb-4 border-b">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center btn btn-sm btn-outline w-full justify-center"
          >
            <FaFilter className="ml-2" />
            فیلترها
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="md:w-1/4">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          </div>

          {/* Product List */}
          <div className="md:w-3/4">
            {isLoading || isFetching ? (
              <div className="mx-auto">
                <Loader size="3xl" />
              </div>
            ) : isError ? (
              <Message type="danger">
                خطا در دریافت محصولات. لطفا دوباره تلاش کنید.
              </Message>
            ) : (
              <>
                <div className="mb-4">
                  <h1 className="text-xl font-bold">
                    {keyword ? `نتایج جستجو برای "${keyword}"` : "همه محصولات"}
                  </h1>
                  {productsData?.count > 0 && (
                    <p className="text-gray-500">
                      {formatNumber(productsData.count)} محصول یافت شد
                    </p>
                  )}
                </div>

                {productsData?.products?.length === 0 ? (
                  <NoResults
                    title="محصولی یافت نشد"
                    description="می‌توانید فیلترهای خود را تغییر دهید یا محصول دیگری جستجو کنید"
                  />
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {productsData?.products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </div>

                    {productsData?.pages > 1 && (
                      <Paginate
                        setPage={setPage}
                        pages={productsData.pages}
                        page={page}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSearchPage;
