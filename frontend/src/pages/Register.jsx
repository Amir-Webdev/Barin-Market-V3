import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/slices/api/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/UI/Loader";
import SEOMeta from "../components/Util/SEOMeta";
import Logo from "../components/UI/Logo";
import Button from "../components/UI/Button";
import { HiOutlineArrowLeft } from "react-icons/hi";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

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

      <div className="flex flex-col justify-center items-center  px-4 -mt-[4rem] md:mt-0">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <div className="w-full max-w-md bg-background border border-border rounded-xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">ثبت‌نام</h1>
            <p className="text-gray-500 mt-2">لطفا اطلاعات خود را وارد کنید</p>
          </div>

          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center gap-4"
          >
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
                className="input bg-background border border-border w-full"
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
                className="input bg-background border border-border w-full"
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
                className="input bg-background border border-border w-full"
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
                className="input bg-background border border-border w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" disabled={isLoading} wfull>
              {isLoading ? (
                <div className="space-x-4 px-4">
                  <span>در حال ثبت‌نام...</span>
                  <Loader size="md" />
                </div>
              ) : (
                "ثبت‌نام"
              )}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <div>
              <span className="text-gray-600">قبلاً ثبت نام کردید؟ </span>
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-primary hover:text-primary-dark font-medium transition"
              >
                وارد شوید
              </Link>
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

export default Register;
