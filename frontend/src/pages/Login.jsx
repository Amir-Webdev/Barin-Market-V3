import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/slices/api/userApiSlice";
import { setCredentials } from "../store/slices/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/UI/Loader";
import SEOMeta from "../components/Util/SEOMeta.jsx";
import Button from "../components/UI/Button.jsx";
import Logo from "../components/UI/Logo.jsx";
import { HiOutlineArrowLeft } from "react-icons/hi";

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
    if (userInfo) navigate(redirect);
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

      <div className="flex flex-col justify-center items-center  px-4 -mt-[6rem] md:mt-0">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <div className="w-full max-w-md bg-background border rounded-xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">ورود به حساب</h1>
            <p className="text-gray-500 mt-1">
              لطفا ایمیل و رمز عبور خود را وارد کنید
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="form-control flex flex-col gap-1">
              <label htmlFor="email" className="label">
                <span className="label-text">ایمیل</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@example.com"
                className="input border border-border bg-background w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-control flex flex-col gap-1">
              <label htmlFor="password" className="label">
                <span className="label-text">رمز عبور</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input border border-border bg-background w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} wfull>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  در حال ورود...
                  <Loader size="sm" />
                </span>
              ) : (
                "ورود"
              )}
            </Button>
          </form>

          <div className="mt-6 text-sm flex justify-between items-center space-y-2 ">
            <div className="space-y-2">
              <div>
                <Link
                  to="/forget-password"
                  className="text-primary hover:underline"
                >
                  فراموشی رمز عبور
                </Link>
              </div>
              <div>
                <span>کاربر جدید هستید؟ </span>
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="text-primary hover:underline"
                >
                  ثبت نام کنید
                </Link>
              </div>
            </div>
            <Button onClick={() => navigate(-1)}>
              <div className="flex items-center gap-1">
                <HiOutlineArrowLeft />
                بازگشت
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
