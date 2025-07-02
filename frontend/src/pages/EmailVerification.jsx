import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaEnvelope,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import { useVerifyEmailQuery } from "../store/slices/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/auth/authSlice";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("در حال تأیید ایمیل شما...");

  const dispatch = useDispatch();

  const { data, error, isFetching } = useVerifyEmailQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (data) {
      setStatus("success");
      setMessage("ایمیل شما با موفقیت تأیید شد!");
      dispatch(setCredentials({ ...data }));
      setTimeout(() => navigate("/login"), 2000);
    } else if (error) {
      setStatus("error");
      setMessage(error?.data?.message || "لینک تأیید نامعتبر یا منقضی شده است");
    }
  }, [data, error, navigate, dispatch]);

  const renderIcon = () => {
    if (isFetching)
      return <FaSpinner className="animate-spin text-blue-500" size={64} />;
    if (status === "success")
      return <FaCheckCircle className="text-green-500" size={64} />;
    if (status === "error")
      return <FaExclamationTriangle className="text-red-500" size={64} />;
    return <FaEnvelope className="text-blue-400" size={64} />;
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mx-2">
      <div className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-5 rounded-full">{renderIcon()}</div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {isFetching && "در حال تأیید ایمیل"}
          {status === "success" && "تأیید موفقیت‌آمیز"}
          {status === "error" && "خطا در تأیید ایمیل"}
        </h2>

        <p className="text-gray-600 mb-6">{message}</p>

        {status === "success" && (
          <div className="w-full bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-green-600">در حال انتقال به صفحه ورود...</p>
          </div>
        )}

        {status === "error" && (
          <button
            className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition"
            onClick={() => navigate("/register")}
          >
            درخواست لینک تأیید جدید
          </button>
        )}

        <div className="w-full mt-6">
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400">یا</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <button
            className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition"
            onClick={() => navigate("/")}
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
