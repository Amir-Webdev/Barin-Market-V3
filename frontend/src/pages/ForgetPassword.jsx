import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForgetPasswordRequestMutation } from "../store/slices/api/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/UI/Loader";
import SEOMeta from "../components/Util/SEOMeta.jsx";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const [forgetPasswordRequest, { isLoading }] =
    useForgetPasswordRequestMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await forgetPasswordRequest({ email }).unwrap();
      toast.success("لینک بازیابی رمز عبور به ایمیل شما ارسال شد");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <SEOMeta
        title="بازیابی رمز عبور | بارین مارکت"
        description="برای بازیابی رمز عبور حساب کاربری خود ایمیلتان را وارد کنید"
        keywords="بازیابی رمز عبور, حساب کاربری, فروشگاه اینترنتی, بارین مارکت"
        canonical={window.location.href}
        openGraph={{
          title: "بازیابی رمز عبور | بارین مارکت",
          description:
            "برای بازیابی رمز عبور حساب کاربری خود ایمیلتان را وارد کنید",
          url: window.location.href,
        }}
      />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-border mx-2">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              بازیابی رمز عبور
            </h1>
            <p className="text-gray-500 mt-2">
              لطفا ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
            </p>
          </div>

          <form onSubmit={submitHandler} dir="rtl">
            <div className="space-y-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
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
                  <span>در حال ارسال... </span>
                  <Loader size="md" />
                </div>
              ) : (
                "ارسال لینک بازیابی"
              )}
            </button>
          </form>

          <div className="flex justify-center mt-6 text-sm text-center">
            <div className="">
              <span className="text-gray-600">بازگشت به صفحه </span>
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

export default ForgotPassword;
