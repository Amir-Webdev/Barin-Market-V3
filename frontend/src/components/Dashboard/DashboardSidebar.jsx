import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  HiChartPie,
  HiUser,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiArrowSmRight,
  HiOutlineLocationMarker,
  HiOutlineClipboardList,
  HiOutlineChatAlt2,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineSupport,
} from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/auth/authSlice";
import { useLogoutMutation } from "../../store/slices/api/userApiSlice";
import { resetCart } from "../../store/slices/cart/cartSlice";
import { toast } from "react-toastify";

function DashboardSidebar() {
  const [tab, setTab] = useState("");
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [callLogoutApi] = useLogoutMutation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  async function handleSignout() {
    try {
      await callLogoutApi().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      toast.success("با موفقیت خارج شدید");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "خطا در خروج از سیستم");
    }
  }

  return (
    <div className="w-full h-full bg-surface/40 -mb-8">
      <ul className="menu py-4 px-2 md:p-4 flex flex-col gap-1">
        <li>
          <Link to="/profile?tab=profile">
            <div
              className={`flex items-center gap-2 ${
                tab === "profile" ? "active" : ""
              }`}
            >
              <HiOutlineUser />
              پروفایل
            </div>
          </Link>
        </li>
        <li>
          <Link to="/profile?tab=address">
            <div
              className={`flex items-center gap-2 ${
                tab === "address" ? "active" : ""
              }`}
            >
              <HiOutlineLocationMarker />
              آدرس‌ها
            </div>
          </Link>
        </li>

        <li>
          <Link to="/profile?tab=orders">
            <div
              className={`flex items-center gap-2 ${
                tab === "orders" ? "active" : ""
              }`}
            >
              <HiOutlineClipboardList />
              سفارش‌ها
            </div>
          </Link>
        </li>

        <li>
          <Link to="/profile?tab=wishlist">
            <div
              className={`flex items-center gap-2 ${
                tab === "wishlist" ? "active" : ""
              }`}
            >
              <HiOutlineHeart />
              علاقه‌مندی‌ها
            </div>
          </Link>
        </li>

        <li>
          <Link to="/profile?tab=comments">
            <div
              className={`flex items-center gap-2 ${
                tab === "comments" ? "active" : ""
              }`}
            >
              <HiOutlineChatAlt2 />
              نظرات
            </div>
          </Link>
        </li>

        <li>
          <Link to="/profile?tab=support">
            <div
              className={`flex items-center gap-2 ${
                tab === "support" ? "active" : ""
              }`}
            >
              <HiOutlineSupport />
              پشتیبانی
            </div>
          </Link>
        </li>

        <li>
          <button className="flex items-center w-full" onClick={handleSignout}>
            <HiArrowSmRight />
            خروج از حساب
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DashboardSidebar;
