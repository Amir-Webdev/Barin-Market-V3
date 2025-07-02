import { useGetMyOrdersQuery } from "../../store/slices/api/orderApiSlice";
import { useNavigate } from "react-router-dom";
import SEOMeta from "../Util/SEOMeta";
import Loader from "../UI/Loader";
import Message from "../UI/Message";
import Button from "../UI/Button";
import { FaTimes } from "react-icons/fa";

function OrderDashboard() {
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading: loadingOrders,
    error: getMyOrdersError,
  } = useGetMyOrdersQuery();
  return (
    <>
      <SEOMeta
        title="پروفایل من | فروشگاه بارین"
        description="اطلاعات پروفایل خود را مشاهده و ویرایش کنید. تاریخچه سفارش‌های خود را بررسی کنید."
        keywords="پروفایل کاربر، فروشگاه، بارین"
        canonical={window.location.href}
        openGraph={{
          title: "پروفایل من | فروشگاه بارین",
          description:
            "اطلاعات پروفایل خود را مشاهده و ویرایش کنید. تاریخچه سفارش‌های خود را بررسی کنید.",
          url: window.location.href,
        }}
      />

      <div className="mt-10 rtl text-right px-4 w-full max-w-screen-lg">
        {/* Orders Table */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          سفارش‌های من
        </h2>

        {loadingOrders ? (
          <Loader />
        ) : getMyOrdersError ? (
          <Message type="danger">
            {getMyOrdersError?.data?.message || getMyOrdersError?.message}
          </Message>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-3 text-right font-medium">کد سفارش</th>
                  <th className="px-4 py-3 text-right font-medium">تاریخ</th>
                  <th className="px-4 py-3 text-right font-medium">مبلغ کل</th>
                  <th className="px-4 py-3 text-right font-medium">
                    پرداخت شده
                  </th>
                  <th className="px-4 py-3 text-right font-medium">وضعیت</th>
                  <th className="px-4 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-base-200">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 dark:hover:bg-base-100"
                  >
                    <td className="px-4 py-3">{order._id}</td>
                    <td className="px-4 py-3">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="px-4 py-3">
                      {order.totalPrice.toLocaleString()} تومان
                    </td>
                    <td className="px-4 py-3">
                      {order.isPaid ? (
                        <span className="text-green-600">
                          {order.paidAt.substring(0, 10)}
                        </span>
                      ) : (
                        <FaTimes className="text-red-600" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {order.status || (
                        <span className="text-yellow-600">در حال پردازش</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Button onClick={() => navigate(`/order/${order._id}`)}>
                        جزئیات
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderDashboard;
