import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode, Zoom, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/zoom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function ProductImages({ product }) {
  const FALLBACK_IMG =
    "https://ecommerce-v1.s3.ir-thr-at1.arvanstorage.ir/Default%2Fphone-placeholder.avif?versionId=";

  return (
    <div className="space-y-8">
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          pagination={{ clickable: true }}
          aria-label="گالری تصاویر محصول"
          className="h-80 w-screen max-w-80 md:max-h-full"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center h-full w-full">
                <img
                  src={image}
                  alt={`${product.name} - تصویر ${index + 1}`}
                  className="max-h-full max-w-full object-cover px-1 rounded-xl"
                  loading="lazy"
                  onError={(e) => (e.target.src = FALLBACK_IMG)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="product-image-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 btn btn-circle btn-sm btn-ghost opacity-70 hover:opacity-100">
          <HiChevronLeft size={24} />
        </div>
        <div className="product-image-next absolute right-2 top-1/2 z-10 -translate-y-1/2 btn btn-circle btn-sm btn-ghost opacity-70 hover:opacity-100">
          <HiChevronRight size={24} />
        </div>
      </div>
      <div className="flex items-center justify-start gap-3">
        {product.images.map((image, index) => (
          <div className="h-20 w-20" key={index}>
            <img
              key={index}
              src={image}
              className="w-full h-full border rounded-2xl shadow-sm object-cover"
              alt={`${product.name} - تصویر ${index + 1}`}
              onError={(e) => (e.target.src = FALLBACK_IMG)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
