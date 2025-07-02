import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode, Zoom, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/zoom";
import { useEffect, useState } from "react";
import {
  useAddLikeMutation,
  useRemoveLikeMutation,
} from "../../store/slices/api/productApiSlice";
import { toast } from "react-toastify";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCompress,
  FaExpand,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function ProductImages({
  product,
  setFullscreenImage,
  userInfo,
  imageGallery,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  function shareProduct() {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("لینک محصول کپی شد");
    }
  }

  const FALLBACK_IMG =
    "https://ecommerce-v1.s3.ir-thr-at1.arvanstorage.ir/Default%2Fphone-placeholder.avif?versionId=";

  {
    /* <div className="space-y-4 max-h-screen">
      <div className="relative rounded-box overflow-hidden bg-base-200">
        <Swiper
          modules={[Navigation, Thumbs, Zoom, Keyboard]}
          spaceBetween={10}
          navigation={{
            nextEl: ".product-image-next",
            prevEl: ".product-image-prev",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          zoom={{
            maxRatio: 3,
            toggle: true,
          }}
          keyboard={{
            enabled: true,
          }}
          className="h-80 md:h-96"
          aria-label="گالری تصاویر محصول"
        >
          {imageGallery.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
                <img
                  src={img.src}
                  alt={`${product.name} - تصویر ${index + 1}`}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.src = img.fallback;
                    e.target.className = "w-full h-full object-cover";
                  }}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}

          <div className="product-image-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 btn btn-circle btn-sm btn-ghost opacity-70 hover:opacity-100">
            <FaChevronLeft />
          </div>
          <div className="product-image-next absolute right-2 top-1/2 z-10 -translate-y-1/2 btn btn-circle btn-sm btn-ghost opacity-70 hover:opacity-100">
            <FaChevronRight />
          </div>

          <div className="absolute bottom-4 right-4 space-x-2 space-x-reverse z-10 flex">
            <button
              onClick={() => setZoomEnabled(!zoomEnabled)}
              className="btn btn-circle btn-sm btn-ghost"
              aria-label={zoomEnabled ? "غیرفعال کردن زوم" : "فعال کردن زوم"}
            >
              {zoomEnabled ? <FaCompress size={14} /> : <FaExpand size={14} />}
            </button>
            <button
              onClick={() =>
                setFullscreenImage(
                  imageGallery[
                    document.querySelector(".swiper-slide-active")?.dataset
                      ?.swiperSlideIndex || 0
                  ]?.src
                )
              }
              className="btn btn-circle btn-sm btn-ghost"
              aria-label="نمایش تمام صفحه"
            >
              <FaExpand size={14} />
            </button>
          </div>
        </Swiper>

        <div className="absolute top-4 left-4 space-x-2 space-x-reverse z-10">
          <button
            onClick={() =>
              userInfo &&
              (wishlist ? handleRemoveLikeProduct() : handleLikeProduct())
            }
            disabled={isAddingLike || isRemovingLike}
            className={`btn btn-circle btn-sm ${
              wishlist ? "btn-error" : "btn-ghost"
            }`}
            aria-label={
              wishlist ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
            }
          >
            <FaHeart />
          </button>
          <button
            onClick={shareProduct}
            className="btn btn-circle btn-sm btn-ghost"
            aria-label="اشتراک‌گذاری محصول"
          >
            <FaShareAlt />
          </button>
        </div>
      </div>

      {imageGallery.length > 1 && (
        <div className="px-2">
          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            breakpoints={{
              320: { slidesPerView: 3 },
              480: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
            }}
            className="thumbnails"
          >
            {imageGallery.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative pb-[100%] rounded-box overflow-hidden border-2 border-transparent hover:border-primary transition-all cursor-pointer">
                  <img
                    src={img.src}
                    alt={`تصویر کوچک ${index + 1}`}
                    className="absolute w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = img.fallback;
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>*/
  }
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
