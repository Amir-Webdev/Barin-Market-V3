import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../animation/404NotFound.animation.json";
import SEOMeta from "../components/Util/SEOMeta.jsx";

const NotFound = () => {
  return (
    <>
      <SEOMeta
        title="صفحه پیدا نشد | بارین مارکت"
        description="صفحه ای که به دنبال آن هستید وجود ندارد یا منتقل شده است"
        keywords="خطای ۴۰۴, صفحه پیدا نشد, فروشگاه اینترنتی, بارین مارکت"
        canonical={window.location.href}
        openGraph={{
          title: "صفحه پیدا نشد | بارین مارکت",
          description:
            "صفحه ای که به دنبال آن هستید وجود ندارد یا منتقل شده است",
          url: window.location.href,
        }}
      />

      <div
        className=" flex flex-col items-center my-12 justify-center px-4 text-center text-gray-700"
        dir="rtl"
      >
        <div className="max-w-sm w-full mb-6">
          <Lottie
            animationData={notFoundAnimation}
            loop
            autoplay
            className="w-full h-auto"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-600 mb-4">
          صفحه مورد نظر یافت نشد
        </h1>

        <p className="text-lg text-gray-500 mb-6 leading-relaxed">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
          <br />
          اجازه دهید شما را به مسیر درست هدایت کنیم.
        </p>

        <div className="flex flex-wrap justify-center gap-4 flex-row-reverse">
          <Link to="/" className="btn btn-primary px-6">
            بازگشت به صفحه اصلی
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline px-6"
          >
            بازگشت به صفحه قبل
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
