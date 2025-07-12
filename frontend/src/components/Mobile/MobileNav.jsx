import {
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineMenu,
  HiOutlineUser,
  HiOutlineLogin,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toPersianDigits } from "../../utils/toPersianDigits";

function MobileNav({ setMobileMenuOpen, userInfo }) {
  const { cartItems } = useSelector((state) => state.cart);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed bottom-3 right-4 left-4 z-50 md:hidden flex gap-2 justify-between px-7 pb-3 pt-4 bg-surface/85 backdrop-blur-sm shadow-sm rounded-2xl text-xs text-text-primary">
      <div className="flex flex-col justify-center items-center gap-2 flex-1">
        <HiOutlineMenu
          className="text-xl"
          onClick={() => setMobileMenuOpen((cur) => !cur)}
          aria-label="منو"
        />
        منو
      </div>
      <Link
        to="/"
        className="flex flex-col justify-center items-center gap-2 flex-1"
      >
        <HiOutlineHome className="text-xl" />
        خانه
      </Link>
      <Link
        to="/cart"
        className="flex flex-col justify-center items-center gap-2 relative flex-1"
      >
        <HiOutlineShoppingCart className="h-5 w-5" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 right-3 px-[6px] pt-[2px] rounded-full bg-primary text-[10px] text-white text-center">
            {toPersianDigits(cartItemCount)}
          </span>
        )}
        سبد خرید
      </Link>
      {userInfo ? (
        <Link
          to="/profile"
          className="flex flex-col justify-center items-center gap-2 flex-1"
        >
          <HiOutlineUser className="text-xl" />
          <span className="text-center">حساب کاربری</span>
        </Link>
      ) : (
        <Link
          to="/login"
          className="flex flex-col justify-center items-center gap-2 flex-1"
        >
          <HiOutlineLogin className="text-xl" />
          ورود
        </Link>
      )}
    </div>
  );
}

export default MobileNav;
