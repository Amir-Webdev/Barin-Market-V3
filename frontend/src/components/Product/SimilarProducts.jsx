import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../store/slices/api/productApiSlice";
import { FaArrowLeft } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

function SimilarProducts({ product }) {
  const { category } = product;

  const { data: similarProductsData } = useGetProductsQuery({
    category: category,
    pageSize: 8,
  });

  const similarProducts =
    similarProductsData?.products?.filter((p) => p._id !== product._id) || [];

  return (
    similarProducts.length > 0 && (
      <div className="mt-12 bg-base-100 rounded-box border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">محصولات مشابه</h2>
          <Link
            to={`/products?category=${category}`}
            className="text-primary hover:underline flex items-center text-sm"
          >
            مشاهده همه
            <FaArrowLeft className="mr-1" size={14} />
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="relative"
        >
          {similarProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="px-1 h-full">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-button-next !left-0 !right-auto !text-neutral hover:!text-primary after:!text-xl" />
          <div className="swiper-button-prev !right-0 !left-auto !text-neutral hover:!text-primary after:!text-xl" />
        </Swiper>
      </div>
    )
  );
}

export default SimilarProducts;
