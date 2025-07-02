import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useResetPasswordRequestMutation } from "../store/slices/api/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/UI/Loader";
import SEOMeta from "../components/Util/SEOMeta.jsx";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  const navigate = useNavigate();
  const [resetPasswordRequest, { isLoading }] =
    useResetPasswordRequestMutation();

  useEffect(() => {
    if (!token || !userId) {
      toast.error("لینک بازیابی معتبر نیست");
      navigate("/forget-password");
    }
  }, [token, userId, navigate]);

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("رمزهای عبور وارد شده مطابقت ندارند");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    try {
      await resetPasswordRequest({ userId, token, password }).unwrap();
      toast.success("رمز عبور شما با موفقیت تغییر یافت");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "خطا در تغییر رمز عبور");
    }
  };

  return (
    <>
      <SEOMeta
        title="تغییر رمز عبور | بارین مارکت"
        description="رمز عبور جدید خود را وارد کنید"
        keywords="تغییر رمز عبور, حساب کاربری, فروشگاه اینترنتی, بارین مارکت"
        canonical={window.location.href}
        openGraph={{
          title: "تغییر رمز عبور | بارین مارکت",
          description: "رمز عبور جدید خود را وارد کنید",
          url: window.location.href,
        }}
      />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-border mx-2">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">تغییر رمز عبور</h1>
            <p className="text-gray-500 mt-2">
              لطفا رمز عبور جدید خود را وارد نمایید
            </p>
          </div>

          <form onSubmit={submitHandler} dir="rtl">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  رمز عبور جدید
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="حداقل ۶ کاراکتر"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  required
                  autoFocus
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  تکرار رمز عبور جدید
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="تکرار رمز عبور"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError("");
                  }}
                  required
                />
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full mt-6 py-2 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <span>در حال تغییر رمز عبور</span>
                  <Loader size="sm" />
                </div>
              ) : (
                "تغییر رمز عبور"
              )}
            </button>
          </form>

          <div className="flex justify-center mt-6 text-sm text-center">
            <div className="text-gray-600">
              <span>بازگشت به صفحه </span>
              <Link
                to="/login"
                className="text-primary hover:text-primary-dark font-medium transition"
              >
                ورود
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
