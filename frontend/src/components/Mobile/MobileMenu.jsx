import { Link } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineX,
  HiOutlineUserCircle,
  HiOutlineViewGrid,
  HiOutlinePhone,
  HiOutlineInformationCircle,
  HiOutlineLogin,
  HiOutlineLogout,
} from "react-icons/hi";
import Button from "../UI/Button";
import useLogout from "../../hooks/useLogout";
import Logo from "../UI/Logo";

function MobileMenu({ mobileMenuOpen, setMobileMenuOpen, userInfo }) {
  function toggleMenu() {
    setMobileMenuOpen((cur) => !cur);
  }

  const logout = useLogout();

  return (
    <div className="drawer z-50">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={mobileMenuOpen}
        onChange={toggleMenu}
      />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-surface min-h-full w-72 p-4 pt-24 relative text-base">
          <button
            className="absolute left-6 top-4 p-4 backdrop-blur-md rounded-xl bg-white/70 border"
            onClick={toggleMenu}
          >
            <span className="-mb-2">
              <HiOutlineX className="text-lg" />
            </span>
          </button>
          <div className="absolute right-6 top-7">
            <Logo />
          </div>
          {userInfo && (
            <div className="flex flex-col justify-center items-center">
              <HiOutlineUserCircle size={84} />
              <span className="text-2xl font-semibold">{userInfo.name}</span>
            </div>
          )}
          <li onClick={toggleMenu} className="mt-8">
            <Link className="flex">
              <HiOutlineHome className="text-xl" />
              خانه
            </Link>
          </li>
          <li onClick={toggleMenu} className="mt-4">
            <Link className="flex">
              <HiOutlineViewGrid className="text-xl" />
              دسته بندی ها
            </Link>
          </li>
          <li onClick={toggleMenu} className="mt-4">
            <Link className="flex">
              <HiOutlinePhone className="text-xl" />
              درباره ما
            </Link>
          </li>
          <li onClick={toggleMenu} className="mt-4">
            <Link className="flex">
              <HiOutlineInformationCircle className="text-xl" />
              تماس با ما
            </Link>
          </li>
          {!userInfo && (
            <div
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
              onClick={toggleMenu}
            >
              <Link to="/login" className="flex gap-4">
                <HiOutlineLogin className="text-3xl" />
                <span className="font-bold text-xl text-nowrap">
                  ورود به حساب
                </span>
              </Link>
            </div>
          )}
          {userInfo && (
            <div
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
              onClick={toggleMenu}
            >
              <Button color="red" onClick={() => logout()}>
                <HiOutlineLogout className="text-lg" />
                خروج از حساب
              </Button>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
export default MobileMenu;
