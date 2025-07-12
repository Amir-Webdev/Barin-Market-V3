import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaHome, FaShoppingBag } from "react-icons/fa";
import Lottie from "lottie-react";
import SuccessfulPurchase from "../animation/SuccessfulPurchase.animation.json";
import { useGetOrderDetailsQuery } from "../store/slices/api/orderApiSlice";
import Loader from "../components/UI/Loader";
import SEOMeta from "../components/Util/SEOMeta.jsx";
import Button from "../components/UI/Button.jsx";

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <SEOMeta
        title="پرداخت موفق | بارین مارکت"
        description="پرداخت شما با موفقیت انجام شد. سفارش شما ثبت شده و در حال پردازش است."
        keywords="پرداخت موفق, فروشگاه اینترنتی, بارین مارکت"
        canonical={window.location.href}
        openGraph={{
          title: "پرداخت موفق | بارین مارکت",
          description:
            "پرداخت شما با موفقیت انجام شد. سفارش شما ثبت شده و در حال پردازش است.",
          url: window.location.href,
        }}
      />

      <div
        className="flex justify-center items-center py-10 px-4 min-h-[80vh]"
        dir="rtl"
      >
        <div className="w-full max-w-2xl">
          <div className="card shadow-md bg-base-100">
            <div className="card-body text-center p-6">
              <div className="mb-4 h-[150px]">
                <Lottie
                  animationData={SuccessfulPurchase}
                  loop={false}
                  style={{ height: "100%" }}
                />
              </div>

              <h2 className="text-2xl font-bold mb-2">پرداخت موفق!</h2>
              <p className="text-gray-500 mb-6">
                با تشکر از خرید شما. سفارش شما ثبت شده و در حال پردازش است.
              </p>

              {/* Order Summary */}
              <div className="bg-base-200 rounded-xl p-4 text-right mb-6">
                <h3 className="text-lg font-bold mb-3">خلاصه سفارش</h3>

                <div className="flex justify-between mb-2">
                  <span className="text-neutral">شماره سفارش:</span>
                  <span className="font-bold">{orderId}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral">مبلغ پرداختی:</span>
                  <span className="font-bold">
                    {order.totalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral">تاریخ:</span>
                  <span className="font-bold">
                    {new Date(order.paidAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral">روش پرداخت:</span>
                  <span className="font-bold">
                    {order.paymentMethod === "ZarinPal"
                      ? "زرین‌پال"
                      : order.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button onClick={() => navigate("/")}>
                  <FaHome className="ms-2" />
                  بازگشت به خانه
                </Button>
                <Button
                  color="green"
                  onClick={() => navigate(`/order/${orderId}`)}
                >
                  <FaShoppingBag className="ms-2" />
                  مشاهده سفارش
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
