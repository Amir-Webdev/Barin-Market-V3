import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useUpdateProfileMutation } from "../store/slices/api/userApiSlice";
import { useGetMyOrdersQuery } from "../store/slices/api/orderApiSlice";
import { setCredentials } from "../store/slices/auth/authSlice";
import Loader from "../components/UI/Loader";
import Message from "../components/Message";
import SEOMeta from "../components/SEOMeta";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation(formData);

  const {
    data: orders,
    isLoading: loadingOrders,
    error: getMyOrdersError,
  } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        name: userInfo.name,
        email: userInfo.email,
      }));
    }
  }, [userInfo]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      toast.error("رمز عبور با تکرار آن مطابقت ندارد");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          ...formData,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("پروفایل با موفقیت بروزرسانی شد");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  }

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

      <div className="grid md:grid-cols-3 gap-6 mt-6 rtl text-right px-4">
        {/* Profile Form */}
        <div className="bg-base-100 shadow-md rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">پروفایل کاربر</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="label">
                <span className="label-text">نام:</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="نام خود را وارد کنید"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">ایمیل:</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="ایمیل خود را وارد کنید"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                <span className="label-text">رمز عبور:</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="رمز عبور جدید را وارد کنید"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="label">
                <span className="label-text">تکرار رمز عبور:</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="رمز عبور را دوباره وارد کنید"
                className="input input-bordered w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              بروزرسانی
            </button>

            {loadingUpdateProfile && <Loader />}
          </form>
        </div>

        {/* Orders Table */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">سفارش‌های من</h2>
          {loadingOrders ? (
            <Loader />
          ) : getMyOrdersError ? (
            <Message type="danger">
              {getMyOrdersError?.data?.message || getMyOrdersError?.message}
            </Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-right">
                <thead>
                  <tr>
                    <th>کد سفارش</th>
                    <th>تاریخ</th>
                    <th>مبلغ کل</th>
                    <th>پرداخت شده</th>
                    <th>وضعیت</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice.toLocaleString()} تومان</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FaTimes className="text-red-600" />
                        )}
                      </td>
                      <td>{order.status || "در حال پردازش"}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/order/${order._id}`)}
                          className="btn btn-sm btn-outline"
                        >
                          جزئیات
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
