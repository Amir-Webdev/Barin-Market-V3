import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../store/slices/api/productApiSlice.js";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import SEOMeta from "../components/Util/SEOMeta.jsx";
import { FaArrowLeft } from "react-icons/fa";
import ReviewsSection from "../components/Product/ReviewsSection.jsx";
import SimilarProducts from "../components/Product/SimilarProducts.jsx";
import ProductInfo from "../components/Product/ProductInfo.jsx";
import Breadcrumb from "../components/UI/Breadcrumb.jsx";
import ProductImages from "../components/Product/ProductImages.jsx";

function ProductPage() {
  const { id: productId } = useParams();
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const {
    data: product,
    refetch,
    isLoading,
    error,
    isError,
  } = useGetProductByIdQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const imageGallery = [product?.mainimage, ...(product?.images || [])]
    .filter(Boolean)
    .map((img) => ({
      src: img,
      fallback:
        "https://ecommerce-v1.s3.ir-thr-at1.arvanstorage.ir/Default%2Fphone-placeholder.avif?versionId=",
    }));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center" dir="rtl">
        <Loader size="lg" />
        <p className="mt-6 text-lg text-gray-600">در حال بارگذاری محصول...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <Message type="error" className="max-w-2xl mx-auto">
          {error?.data?.message || "خطا در دریافت اطلاعات محصول"}
        </Message>
        <div className="text-center mt-6">
          <Link to="/" className="btn btn-primary">
            <FaArrowLeft className="ml-2" />
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <Message type="info" className="max-w-2xl mx-auto">
          محصول مورد نظر یافت نشد
        </Message>
        <div className="text-center mt-6">
          <Link to="/" className="btn btn-primary">
            <FaArrowLeft className="ml-2" />
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOMeta
        title={`${product.name} | بارین مارکت`}
        description={
          product.description || "جزئیات محصول را در بارین مارکت مشاهده کنید."
        }
        keywords={`${product.name}, ${product.category}, ${product.brand}, فروشگاه اینترنتی`}
        canonical={window.location.href}
        openGraph={{
          title: `${product.name} | بارین مارکت`,
          description: product.description || "جزئیات محصول",
          url: window.location.href,
          images: product.image ? [{ url: product.image }] : [],
        }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb product={product} />

        {/* Main Product Section */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images */}
            <ProductImages
              product={product}
              fullscreenImage={fullscreenImage}
              setFullscreenImage={setFullscreenImage}
              userInfo={userInfo}
              imageGallery={imageGallery}
            />

            {/* Product Info */}
            <ProductInfo product={product} productId={productId} />
          </div>
        </div>

        {/* Similar Products Section */}
        {<SimilarProducts product={product} />}

        {/* Reviews Section */}
        <ReviewsSection product={product} refetchProduct={refetch} />
      </div>
    </>
  );
}

export default ProductPage;
