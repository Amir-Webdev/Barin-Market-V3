import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/slices/api/userApiSlice";
import { setCredentials } from "../store/slices/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/UI/Loader";
import SEOMeta from "../components/Util/SEOMeta.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <SEOMeta
        title="ورود به حساب | بارین مارکت"
        description="برای دسترسی به حساب کاربری و خرید محصولات وارد شوید"
        keywords="ورود, حساب کاربری, فروشگاه اینترنتی, بارین مارکت"
        canonical={window.location.href}
        openGraph={{
          title: "ورود به حساب | بارین مارکت",
          description: "برای دسترسی به حساب کاربری و خرید محصولات وارد شوید",
          url: window.location.href,
        }}
      />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-border mx-auto mt-20">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">ورود به حساب</h1>
            <p className="text-gray-500 mt-2">
              لطفا ایمیل و رمز عبور خود را وارد کنید
            </p>
          </div>

          <form onSubmit={submitHandler}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                  <span>در حال ورود... </span>
                  <Loader size="md" />
                </div>
              ) : (
                "ورود"
              )}
            </button>
          </form>

          <div className="flex justify-between mt-6 text-sm text-center">
            <div className="">
              <span className="text-gray-600">کاربر جدید هستید؟ </span>
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-primary hover:text-primary-dark font-medium transition"
              >
                ثبت نام کنید
              </Link>
            </div>
            <div>
              <Link
                to="/forget-password"
                className="text-primary hover:text-primary-dark font-medium transition"
              >
                فراموشی رمزعبور
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
