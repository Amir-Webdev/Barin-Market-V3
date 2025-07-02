import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

function ProductsCarousel() {
  return (
    <div className="w-full mb-6 md:mb-14">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        autoplay={{ delay: 2000 }}
        loop
        pagination={{ clickable: true }}
        className="rounded-xl bg-base-200"
      >
        <SwiperSlide>
          <div className="h-[20vh] sm:h-[30vh] lg:h-[40vh]">
            <img
              src="/carousel/samsung.webp"
              alt="تلفن های همراه سامسونگ"
              loading="eager"
              className="h-full w-full object-cover mx-auto"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[20vh] sm:h-[30vh] lg:h-[40vh]">
            <img
              src="/carousel/xiaomi.jpg"
              alt="تلفن های همراه شیایومی"
              loading="eager"
              className="h-full w-full object-cover mx-auto"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[20vh] sm:h-[30vh] lg:h-[40vh]">
            <img
              src="/carousel/apple.png"
              alt="تلفن های همراه اپل"
              loading="eager"
              className="h-full w-full object-cover mx-auto"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProductsCarousel;
