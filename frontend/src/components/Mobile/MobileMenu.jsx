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
        <ul className="menu bg-surface text-base-content min-h-full w-72 p-4 pt-24 relative text-base">
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
{
  /*<div
      className={`md:hidden fixed inset-y-0 right-0 top-0 w-64 bg-white shadow-lg transform ${
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex flex-col h-full p-4">
        <div className="mb-4">
          <SearchBox />
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {userInfo ? (
              <>
                <li>
                  <button
                    className="w-full text-right p-3 hover:bg-gray-50 rounded-lg flex items-center justify-between"
                    onClick={() => {
                      navigate("/profile");
                      closeMobileMenu();
                    }}
                  >
                    <span>پروفایل کاربری</span>
                    <FaUser className="text-sm" />
                  </button>
                </li>

                {userInfo.isAdmin && (
                  <>
                    <li className="mt-4 pt-2 border-t border-gray-100">
                      <span className="text-xs text-text-primary px-3">
                        مدیریت
                      </span>
                    </li>
                    <li>
                      <button
                        className="w-full text-right p-3 hover:bg-gray-50 rounded-lg"
                        onClick={() => {
                          navigate("/admin/productlist");
                          closeMobileMenu();
                        }}
                      >
                        محصولات
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-right p-3 hover:bg-gray-50 rounded-lg"
                        onClick={() => {
                          navigate("/admin/userlist");
                          closeMobileMenu();
                        }}
                      >
                        کاربران
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-right p-3 hover:bg-gray-50 rounded-lg"
                        onClick={() => {
                          navigate("/admin/orderlist");
                          closeMobileMenu();
                        }}
                      >
                        سفارشات
                      </button>
                    </li>
                  </>
                )}

                <li className="mt-4 pt-2 border-t border-gray-100">
                  <button
                    className="w-full text-right p-3 hover:bg-gray-50 rounded-lg text-error flex items-center justify-between"
                    onClick={logoutHandler}
                  >
                    <span>خروج از سیستم</span>
                    <FaSignOutAlt className="text-sm" />
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg justify-between"
                  onClick={closeMobileMenu}
                >
                  <span>ورود / ثبت‌نام</span>
                  <FaUser className="text-sm" />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>}
  );
*/
}
export default MobileMenu;
