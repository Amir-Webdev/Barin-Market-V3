import { useGetOrdersQuery } from "../../store/slices/api/orderApiSlice";
import { FaTimes, FaCheck, FaInfoCircle, FaSyncAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/UI/Loader";
import Message from "../../components/UI/Message";
import SEOMeta from "../../components/Util/SEOMeta";
import { formatNumber } from "../../utils/toPersianDigits";
import { toPersianDate } from "../../utils/toPersianDate";

const STATUS_CONFIG = {
  processing: {
    className: "bg-yellow-100 text-yellow-800",
    text: "در حال پردازش",
    icon: "🔄",
  },
  delivered: {
    className: "bg-green-100 text-green-800",
    text: "تحویل شده",
    icon: "✅",
  },
  cancelled: {
    className: "bg-red-100 text-red-800",
    text: "لغو شده",
    icon: "❌",
  },
  shipped: {
    className: "bg-blue-100 text-blue-800",
    text: "ارسال شده",
    icon: "🚚",
  },
};

function OrderList() {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page") || "1");

  if (isLoading) return <Loader fullScreen />;

  if (error) {
    return (
      <Message type="error" onRetry={refetch} className="my-8">
        {error?.data?.message || error?.error || "خطا در دریافت لیست سفارش‌ها"}
      </Message>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-auto">
      <SEOMeta
        title="لیست سفارش‌ها | مدیریت | فروشگاه بارین"
        description="مشاهده و مدیریت تمامی سفارش‌های کاربران در پنل مدیریت فروشگاه بارین."
        keywords="سفارش, لیست سفارش‌ها, مدیریت, فروشگاه اینترنتی, بارین"
      />

      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">مدیریت سفارش‌ها</h1>
          <button
            onClick={refetch}
            className="btn btn-outline btn-sm flex items-center gap-2"
          >
            <FaSyncAlt className="text-sm" />
            بروزرسانی لیست
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr className="text-right">
                  <th className="w-[10%]">شناسه سفارش</th>
                  <th className="w-[15%]">مشتری</th>
                  <th className="w-[12%]">تاریخ</th>
                  <th className="w-[12%]">مبلغ</th>
                  <th className="w-[15%]">وضعیت پرداخت</th>
                  <th className="w-[15%]">وضعیت سفارش</th>
                  <th className="w-[10%] text-center">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 group">
                    <td className="font-mono text-xs text-gray-600">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {order.user?.name || "مهمان"}
                        </span>
                        {order.user?.email && (
                          <span className="text-xs text-gray-500">
                            {order.user.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-sm text-gray-600">
                      {toPersianDate(order.createdAt)}
                    </td>
                    <td className="font-medium text-gray-800">
                      {formatNumber(order.totalPrice)} تومان
                    </td>
                    <td>
                      {order.isPaid ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <FaCheck className="flex-shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs font-medium">
                              پرداخت شده
                            </span>
                            <span className="text-xs text-gray-500">
                              {toPersianDate(order.paidAt)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <FaTimes className="flex-shrink-0" />
                          <span className="text-xs font-medium">
                            پرداخت نشده
                          </span>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {STATUS_CONFIG[order.status]?.icon}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            STATUS_CONFIG[order.status]?.className ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {STATUS_CONFIG[order.status]?.text || order.status}
                        </span>
                      </div>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="btn btn-ghost btn-xs text-primary hover:bg-primary/10"
                        aria-label={`مشاهده سفارش ${order._id}`}
                      >
                        مشاهده
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {orders?.pages > 1 && (
          <Paginate
            pages={orders.pages}
            page={pageNumber}
            setPage={(p) => {
              const params = new URLSearchParams(searchParams);
              params.set("page", p);
              setSearchParams(params);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default OrderList;
