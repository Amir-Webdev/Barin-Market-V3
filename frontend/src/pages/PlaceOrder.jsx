import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../store/slices/api/orderApiSlice";
import { clearCartItems } from "../store/slices/cart/cartSlice";
import Message from "../components/Message";
import Loader from "../components/UI/Loader";
import SEOMeta from "../components/Util/SEOMeta.jsx";
import { formatNumber } from "../utils/toPersianDigits.js";

function PlaceOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) navigate("/shipping");
    else if (!cart.paymentMethod) navigate("/payment");
  }, [cart, navigate]);

  async function placeOrderHandler() {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="flex flex-col">
      <SEOMeta
        title="تکمیل سفارش | بارین مارکت"
        description="جزئیات سفارش خود را بررسی و خریدتان را نهایی کنید"
        keywords="تکمیل سفارش, فروشگاه اینترنتی, بارین مارکت"
        canonical={window.location.href}
        openGraph={{
          title: "تکمیل سفارش | بارین مارکت",
          description: "جزئیات سفارش خود را بررسی و خریدتان را نهایی کنید",
          url: window.location.href,
        }}
      />

      <CheckoutSteps step="4" isRTL={true} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rtl px-4 py-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white shadow-md rounded-xl p-4">
            <h2 className="text-lg font-bold mb-2">اطلاعات ارسال</h2>
            <p className="text-sm">
              <strong>آدرس: </strong>
              {cart.shippingAddress.address}، {cart.shippingAddress.city}،{" "}
              {cart.shippingAddress.postalCode}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-4">
            <h2 className="text-lg font-bold mb-2">روش پرداخت</h2>
            <p className="text-sm">
              <strong>روش: </strong>
              {cart.paymentMethod === "ZarinPal"
                ? "زرین‌پال"
                : cart.paymentMethod}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-4">
            <h2 className="text-lg font-bold mb-4">محصولات سفارش</h2>
            {cart.cartItems.length === 0 ? (
              <Message>سبد خرید شما خالی است</Message>
            ) : (
              <ul className="space-y-4">
                {cart.cartItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1 text-right">
                      <Link
                        to={`/product/${item._id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-sm">
                      {item.quantity} × {item.price.toLocaleString("fa-IR")}{" "}
                      تومان ={" "}
                      {(item.quantity * item.price).toLocaleString("fa-IR")}{" "}
                      تومان
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-bold text-right">خلاصه سفارش</h2>
          <div className="flex justify-between text-sm">
            <span>محصولات:</span>
            <span>{formatNumber(cart.itemsPrice)} تومان</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>هزینه ارسال:</span>
            <span>{formatNumber(cart.shippingPrice)} تومان</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>مالیات:</span>
            <span>{formatNumber(cart.taxPrice)} تومان</span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span>جمع کل:</span>
            <span>{formatNumber(cart.totalPrice)} تومان</span>
          </div>

          {error && (
            <div>
              <Message type="danger">
                {error.data?.message || error.error || "خطا در ثبت سفارش"}
              </Message>
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary w-full"
            disabled={cart.cartItems.length === 0 || isLoading}
            onClick={placeOrderHandler}
          >
            {isLoading ? "در حال ثبت سفارش..." : "تکمیل سفارش"}
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
