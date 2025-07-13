import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import Lottie from "lottie-react";
import emptyCartAnimation from "../animation/EmptyCart.animation.json";
import Message from "../components/UI/Message";
import SEOMeta from "../components/Util/SEOMeta";
import { addToCart, removeFromCart } from "../store/slices/cart/cartSlice";
import { formatNumber, toPersianDigits } from "../utils/toPersianDigits";
import Button from "../components/UI/Button";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  // Calculate totals
  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <>
      <SEOMeta
        title="سبد خرید | بارین مارکت"
        description="مدیریت سبد خرید و مشاهده محصولات انتخاب شده"
        keywords="سبد خرید, خرید اینترنتی, بارین مارکت"
        canonical={window.location.href}
        openGraph={{
          title: "سبد خرید | بارین مارکت",
          description: "مدیریت سبد خرید و مشاهده محصولات انتخاب شده",
          url: window.location.href,
        }}
      />

      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">سبد خرید شما</h1>
          <Button onClick={() => navigate(-1)}>
            <FaArrowLeft />
            <span>بازگشت</span>
          </Button>
        </div>

        {!cartItems.length ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="max-w-xs mx-auto">
              <Lottie animationData={emptyCartAnimation} loop autoplay />
            </div>
            <Message variant="info" className="mt-6 text-center">
              سبد خرید شما خالی است
            </Message>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item?.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-md border p-1"
                    />
                    <div className="text-right flex-1">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-base font-medium text-gray-800 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-600 mt-1">
                        {item.brand}
                      </div>
                      <div className="text-primary font-bold mt-1">
                        {formatNumber(item.price)} تومان
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <select
                      className="select bg-background border border-border select-sm w-20"
                      value={item.quantity}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="btn btn-ghost btn-sm text-red-500 hover:text-red-700 hover:bg-red-50"
                      aria-label="حذف محصول"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="card bg-white border">
                <div className="card-body p-6 space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b pb-4">
                    خلاصه سفارش
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>تعداد محصولات:</span>
                      <span className="font-medium">
                        {toPersianDigits(itemsCount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>جمع کل:</span>
                      <span className="font-bold text-primary">
                        {formatNumber(subtotal)} تومان
                      </span>
                    </div>
                  </div>

                  <Button
                    disabled={!cartItems.length}
                    onClick={checkoutHandler}
                  >
                    ادامه جهت پرداخت
                  </Button>

                  <div className="text-sm text-gray-500 text-center mt-4">
                    هزینه نهایی پس از ثبت آدرس و روش ارسال محاسبه خواهد شد
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
