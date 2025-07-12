import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/Order/CheckoutSteps";
import { useCreateOrderMutation } from "../store/slices/api/orderApiSlice";
import { clearCartItems } from "../store/slices/cart/cartSlice";
import Message from "../components/UI/Message";
import Loader from "../components/UI/Loader";
import SEOMeta from "../components/Util/SEOMeta.jsx";
import { formatNumber, toPersianDigits } from "../utils/toPersianDigits.js";
import Button from "../components/UI/Button.jsx";

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
    <div className="max-w-6xl mx-auto my-4 px-4 py-6">
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

      <div className="max-w-2xl mx-auto">
        <CheckoutSteps step="4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border rounded-xl p-4">
            <h2 className="text-lg font-bold mb-2">اطلاعات ارسال</h2>
            <p className="text-sm">
              <strong>آدرس: </strong>
              {cart.shippingAddress.address}، {cart.shippingAddress.city}،{" "}
              {cart.shippingAddress.postalCode}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <h2 className="text-lg font-bold mb-2">روش پرداخت</h2>
            <p className="text-sm">
              <strong>روش: </strong>
              {cart.paymentMethod === "ZarinPal"
                ? "زرین‌پال"
                : cart.paymentMethod}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
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
                      {toPersianDigits(item.quantity)} ×{" "}
                      {formatNumber(item.price)} تومان =
                      {formatNumber(item.quantity * item.price)} تومان
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white border max-h-64 rounded-xl p-4 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-right">خلاصه سفارش</h2>
          <div className="flex justify-between text-sm">
            <span>محصولات:</span>
            <span>{formatNumber(Math.trunc(cart.itemsPrice))} تومان</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>هزینه ارسال:</span>
            <span>{formatNumber(Math.trunc(cart.shippingPrice))} تومان</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>مالیات:</span>
            <span>{formatNumber(Math.trunc(cart.taxPrice))} تومان</span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span>جمع کل:</span>
            <span>{formatNumber(Math.trunc(cart.totalPrice))} تومان</span>
          </div>

          {error && (
            <div>
              <Message type="danger">
                {error.data?.message || error.error || "خطا در ثبت سفارش"}
              </Message>
            </div>
          )}

          <Button
            disabled={cart.cartItems.length === 0 || isLoading}
            onClick={placeOrderHandler}
            wfull
          >
            {isLoading ? "در حال ثبت سفارش..." : "تکمیل سفارش"}
          </Button>
        </div>

        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default PlaceOrder;
