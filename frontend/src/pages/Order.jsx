import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useUpdataOrderStatusMutation,
} from "../store/slices/api/orderApiSlice";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SEOMeta from "../components/Util/SEOMeta.jsx";
import { formatNumber } from "../utils/toPersianDigits.js";
import Button from "../components/UI/Button.jsx";

function Order() {
  const [orderStatus, setOrderStatus] = useState();
  const { orderId } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation({});
  const [updateOrderStatus, { isLoading: loadingStatus }] =
    useUpdataOrderStatusMutation(orderId, orderStatus);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.isAdmin && !isLoading) {
      setOrderStatus(order?.status);
    }
  }, [userInfo, order, isLoading]);

  async function onApproveTest() {
    try {
      await payOrder({ orderId, details: { payer: {} } }).unwrap();
      refetch();
      navigate(`/payment-success/${orderId}`);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  async function updateStatusHandler(e) {
    try {
      setOrderStatus(e.target.value);
      await updateOrderStatus({ orderId, status: e.target.value }).unwrap();
      refetch();
      toast.success("وضعیت سفارش با موفقیت به‌روزرسانی شد");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message type="error">
        {error?.data?.message || error.error || "خطا در بارگذاری جزئیات سفارش"}
      </Message>
    );

  return (
    <div className="max-w-6xl mx-auto my-4 px-4 py-6">
      <SEOMeta
        title={`جزئیات سفارش | سفارش #${order._id} | بارین مارکت`}
        description={`مشاهده جزئیات سفارش #${order._id}. اطلاعات پرداخت، ارسال و محصولات را بررسی کنید.`}
        keywords="جزئیات سفارش, فروشگاه اینترنتی, بارین مارکت"
        canonical={window.location.href}
        openGraph={{
          title: `جزئیات سفارش | سفارش #${order._id} | بارین مارکت`,
          description: `مشاهده جزئیات سفارش #${order._id}. اطلاعات پرداخت، ارسال و محصولات را بررسی کنید.`,
          url: window.location.href,
        }}
      />

      <h1 className="text-2xl font-bold text-right mb-6">سفارش {order._id}</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Order Info */}
        <div className="flex-1 space-y-6">
          {/* Shipping Info */}
          <div className="card border p-4 space-y-4">
            <h2 className="text-lg font-semibold text-right mb-2">
              اطلاعات ارسال
            </h2>
            <p className="text-right">
              <strong>نام:</strong> {order.user.name}
            </p>
            <p className="text-right">
              <strong>ایمیل:</strong> {order.user.email}
            </p>
            <p className="text-right">
              <strong>آدرس:</strong> {order.shippingAddress.address}،{" "}
              {order.shippingAddress.city}
            </p>
            <p className="text-right">
              <strong>وضعیت سفارش:</strong>{" "}
              {order.status === "Processing" ? "در حال پردازش" : "تحویل شده"}
            </p>
            <div className="mt-2">
              {order.status === "Processing" ? (
                <Message>سفارش در حال پردازش است</Message>
              ) : (
                <Message type="success">
                  تحویل شده در تاریخ {order.deliveredAt}
                </Message>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="card border p-4">
            <h2 className="text-lg font-semibold text-right mb-2">
              روش پرداخت
            </h2>
            <p className="text-right">
              <strong>روش:</strong>{" "}
              {order.paymentMethod === "PayPal"
                ? "پی‌پال"
                : order.paymentMethod}
            </p>
            <div className="mt-2">
              {order.isPaid ? (
                <Message type="success">
                  پرداخت شده در تاریخ {order.paidAt}
                </Message>
              ) : (
                <Message type="error">پرداخت نشده</Message>
              )}
            </div>
          </div>

          {/* Ordered Items */}
          <div className="card border p-4">
            <h2 className="text-lg font-semibold text-right mb-4">
              محصولات سفارش
            </h2>
            <ul className="space-y-4 divide-y divide-gray-200">
              {order.orderItems.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 text-right"
                >
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="flex flex-col text-right">
                      <Link
                        to={`/product/${item.product}`}
                        className="font-semibold text-sm hover:underline"
                      >
                        {item.name}
                      </Link>
                      <span className="text-sm text-gray-500">
                        تعداد: {formatNumber(item.quantity)}
                      </span>
                    </div>
                    <img
                      src={
                        item.images[0] ||
                        "https://ecommerce-v3.s3.ir-thr-at1.arvanstorage.ir/Defaults%2Fimage%20placeholder.png"
                      }
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  </div>
                  <p className="text-sm font-medium whitespace-nowrap">
                    {formatNumber(item.quantity * item.price)} تومان
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="card border p-6 space-y-4">
            <h2 className="text-lg font-bold text-right mb-2">خلاصه سفارش</h2>
            <div className="text-right space-y-4 text-sm">
              <div className="flex justify-between flex-row-reverse">
                <span>{formatNumber(order.itemsPrice)} تومان</span>
                <span>محصولات:</span>
              </div>
              <div className="flex justify-between flex-row-reverse">
                <span>{formatNumber(order.shippingPrice)} تومان</span>
                <span>هزینه ارسال:</span>
              </div>
              <div className="flex justify-between flex-row-reverse">
                <span>{formatNumber(order.taxPrice)} تومان</span>
                <span>مالیات:</span>
              </div>
              <div className="flex justify-between font-bold flex-row-reverse">
                <span>{formatNumber(order.totalPrice)} تومان</span>
                <span>جمع کل:</span>
              </div>
            </div>

            {/* Payment Button */}
            {!order.isPaid && (
              <div className="mt-4">
                {loadingPay && <Loader />}
                <Button onClick={onApproveTest} wfull>
                  تست پرداخت
                </Button>
              </div>
            )}

            {/* Admin: Status Update */}
            {loadingStatus && <Loader />}
            {userInfo?.isAdmin && order.isPaid && (
              <div className="mt-6">
                <label className="block mb-2 text-right font-medium">
                  وضعیت سفارش
                </label>
                <select
                  className="select select-bordered w-full text-right"
                  value={orderStatus}
                  onChange={updateStatusHandler}
                >
                  <option value="Processing">در حال پردازش</option>
                  <option value="Delivered">تحویل شده</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
