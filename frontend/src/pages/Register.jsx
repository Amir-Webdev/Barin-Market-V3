import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/slices/api/userApiSlice";
import { setCredentials } from "../store/slices/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/UI/Loader";
import SEOMeta from "../components/Util/SEOMeta";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      toast.error("رمزهای عبور مطابقت ندارند");
      return;
    }
    try {
      const res = await register(formData).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <SEOMeta
        title="ثبت‌نام | فروشگاه بارین"
        description="در فروشگاه بارین ثبت‌نام کنید و خرید خود را آغاز نمایید."
        keywords="ثبت‌نام، فروشگاه اینترنتی، بارین"
        canonical={window.location.href}
        openGraph={{
          title: "ثبت‌نام | فروشگاه بارین",
          description:
            "در فروشگاه بارین ثبت‌نام کنید و خرید خود را آغاز نمایید.",
          url: window.location.href,
        }}
      />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mx-auto mt-20">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">ثبت‌نام</h1>
            <p className="text-gray-500 mt-2">لطفا اطلاعات خود را وارد کنید</p>
          </div>

          <form onSubmit={submitHandler} dir="rtl" className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                نام کامل
              </label>
              <input
                id="name"
                type="text"
                placeholder="نام و نام خانوادگی"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ایمیل
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                تأیید رمز عبور
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={`w-full mt-6 py-2 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="space-x-4 px-4">
                  <span>در حال ثبت‌نام...</span>
                  <Loader size="md" />
                </div>
              ) : (
                "ثبت‌نام"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">قبلاً حساب دارید؟ </span>
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-primary hover:text-primary-dark font-medium transition"
            >
              وارد شوید
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
