import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../store/slices/api/userApiSlice";
import { useEffect, useState } from "react";
import Loader from "../../components/UI/Loader";
import Message from "../../components/UI/Message";
import SEOMeta from "../../components/Util/SEOMeta.jsx";
import Button from "../../components/UI/Button.jsx";

function UserEdit() {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    isAdmin: false,
  });

  const {
    data: userData,
    refetch,
    isLoading: isLoadingUser,
    error: getUserError,
  } = useGetUserByIdQuery(userId);

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (userData) {
      setUser({
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        isAdmin: Boolean(userData.isAdmin),
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user).unwrap();
      toast.success("کاربر با موفقیت ویرایش شد");
      refetch();
      navigate("/admin/userlist");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div dir="rtl" className="p-4 space-y-4">
      <SEOMeta
        title={`ویرایش کاربر | ${user.name} | مدیریت | فروشگاه بارین`}
        description={`ویرایش اطلاعات کاربر ${user.name} در پنل مدیریت فروشگاه بارین.`}
        keywords="ویرایش کاربر، مدیریت، فروشگاه اینترنتی، بارین"
        canonical={window.location.href}
        openGraph={{
          title: `ویرایش کاربر | ${user.name} | مدیریت | فروشگاه بارین`,
          description: `ویرایش اطلاعات کاربر ${user.name} در پنل مدیریت فروشگاه بارین.`,
          url: window.location.href,
        }}
      />

      <Link to="/admin/userlist" className="btn btn-outline my-3 w-fit">
        بازگشت
      </Link>

      <div className="max-w-xl mx-auto bg-base-100 shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">ویرایش کاربر</h1>

        {isUpdating && <Loader />}
        {isLoadingUser ? (
          <Loader />
        ) : getUserError ? (
          <Message type="error">{getUserError}</Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="form-control flex flex-col">
              <label htmlFor="name" className="label">
                <span className="label-text">نام</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="نام را وارد کنید"
                className="input input-bordered"
                value={user.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-control flex flex-col">
              <label htmlFor="email" className="label">
                <span className="label-text">ایمیل</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="ایمیل را وارد کنید"
                className="input input-bordered"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">مدیر است</span>
                <input
                  id="isAdmin"
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={user.isAdmin}
                  onChange={(e) =>
                    setUser({ ...user, isAdmin: e.target.checked })
                  }
                />
              </label>
            </div>

            <Button type="submit">ذخیره تغییرات</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserEdit;
