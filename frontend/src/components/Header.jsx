import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlinePhone,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineViewGrid,
  HiOutlineSearch,
  HiOutlineX,
} from "react-icons/hi";
import { MdPhoneInTalk } from "react-icons/md";
import SearchBox from "./Search/SearchBox";
import Logo from "./UI/Logo";
import { formatNumber, toPersianDigits } from "../utils/toPersianDigits";
import { useState } from "react";

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  function toggleSearch() {
    setSearchOpen((cur) => !cur);
  }

  return (
    <header className="fixed md:sticky md:top-0 top-3 md:right-0 right-4 md:left-0 left-4 md:rounded-none rounded-2xl z-40 bg-surface/85 backdrop-blur-sm shadow-sm md:pb-1">
      <div className="container mx-auto px-4 flex flex-col">
        <div className="flex h-16 items-center justify-between">
          {!searchOpen && <Logo />}

          <div className="hidden md:flex mx-4 flex-1 max-w-xl">
            <SearchBox />
          </div>

          {!searchOpen && (
            <button
              className="md:hidden bg-white/85 border backdrop-blur-sm p-3 rounded-2xl"
              onClick={toggleSearch}
            >
              <HiOutlineSearch />
            </button>
          )}

          {searchOpen && (
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1">
                <SearchBox />
              </div>
              <button
                className="p-3 bg-white/85 border backdrop-blur-sm rounded-xl"
                onClick={toggleSearch}
              >
                <HiOutlineX />
              </button>
            </div>
          )}

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={`/${userInfo ? "profile" : "login"}`}
              className="flex gap-2 items-start"
            >
              <div className="text-sm flex flex-col">
                <span className="text-xs">حساب کاربری</span>
                <span className="font-bold">
                  {userInfo?.name || "ورود / ثبت‌نام"}
                </span>
              </div>
              <HiOutlineUser className="text-4xl" />
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-2"
              aria-label="سبد خرید"
            >
              <div className="text-sm flex flex-col">
                <span className="text-xs">سبد خرید</span>
                <span className="font-bold">
                  {formatNumber(totalPrice) || "ورود / ثبت‌نام"} تومان
                </span>
              </div>
              <div className="relative">
                <HiOutlineShoppingCart className="text-3xl" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex px-[6px] pt-[2px] items-center justify-center rounded-full bg-primary text-xs text-white">
                    {cartItemCount > 9 ? "9+" : toPersianDigits(cartItemCount)}
                  </span>
                )}
              </div>
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex justify-between items-center">
          <ul className="flex justify-between flex-1 max-w-[50%]">
            <Link
              to="/"
              className="flex gap-2 items-center btn btn-ghost rounded-lg"
            >
              <HiOutlineHome className="text-xl -mt-1" />
              خانه
            </Link>
            <Link className="flex gap-2 items-center btn btn-ghost rounded-lg">
              <HiOutlineViewGrid className="text-xl -mt-1" />
              دسته بندی ها
            </Link>
            <Link className="flex gap-2 items-center btn btn-ghost rounded-lg">
              <HiOutlinePhone className="text-xl -mt-1" />
              درباره ما
            </Link>
            <Link className="flex gap-2 items-center btn btn-ghost rounded-lg">
              <HiOutlineInformationCircle className="text-xl -mt-1" />
              تماس با ما
            </Link>
          </ul>
          <div className="flex gap-3 items-center border bg-white/60 backdrop-blur-lg rounded-xl px-4 py-3">
            <span className="font-bold text-sm">
              {toPersianDigits("026123456")}
            </span>
            <MdPhoneInTalk className="text-xl" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
