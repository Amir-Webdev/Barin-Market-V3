import { useCallback } from "react";
import { useLogoutMutation } from "../store/slices/api/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/auth/authSlice";
import { resetCart } from "../store/slices/cart/cartSlice";
import { toast } from "react-toastify";

function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [callLogoutApi] = useLogoutMutation();

  const logoutHandler = useCallback(
    async (onComplete = () => {}) => {
      try {
        await callLogoutApi().unwrap();
        dispatch(logout());
        dispatch(resetCart());
        toast.success("با موفقیت خارج شدید");
        navigate("/login");
        onComplete();
      } catch (error) {
        toast.error(error?.data?.message || "خطا در خروج از سیستم");
      }
    },
    [callLogoutApi, dispatch, navigate]
  );

  return logoutHandler;
}

export default useLogout;
