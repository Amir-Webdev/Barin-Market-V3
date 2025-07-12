import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteUserMutation,
  useUpdateProfileMutation,
} from "../../store/slices/api/userApiSlice";
import { toast } from "react-toastify";
import { logout, setCredentials } from "../../store/slices/auth/authSlice";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";
import SEOMeta from "../Util/SEOMeta";

function ProfileDashboard({ userInfo }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation(formData);

  const [deleteUser, { isLoading: deletingUser }] = useDeleteUserMutation();

  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        name: userInfo.name,
        email: userInfo.email,
      }));
    }
  }, [userInfo]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      toast.error("رمز عبور با تکرار آن مطابقت ندارد");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          ...formData,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("پروفایل با موفقیت بروزرسانی شد");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  }

  async function handleDeleteAccount() {
    try {
      await deleteUser(userInfo._id).unwrap();
      dispatch(logout());
      localStorage.removeItem("userInfo");
      navigate("/");
    } catch (error) {
      toast.error(
        error.message ||
          error.data.message ||
          "در روند حذف حساب مشکلی بوجود آمد. مجددا تلاش کنید."
      );
    }
  }

  return (
    <>
      <SEOMeta title="  پروفایل کاربری | فروشگاه بارین" />
      <div className="max-w-xl mx-auto mt-16 p-8 bg-background border border-border rounded-2xl space-y-6 mb-16">
        <h2 className="text-2xl font-semibold text-center">پروفایل کاربر</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium">
              نام
            </label>
            <input
              type="text"
              id="name"
              placeholder="نام خود را وارد کنید"
              className="input bg-background border-border border"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              className="input bg-background disabled:bg-surface disabled:text-text-secondary"
              value={formData.email}
              disabled
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              رمز عبور جدید
            </label>
            <input
              type="password"
              id="password"
              placeholder="رمز عبور جدید را وارد کنید"
              className="input bg-background border-border border"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              تکرار رمز عبور
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="رمز عبور را دوباره وارد کنید"
              className="input bg-background border-border border"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <Button type="submit" wfull>
              بروزرسانی
            </Button>
          </div>

          {loadingUpdateProfile && <Loader />}
        </form>

        <Modal
          id="Delete_Account_Modal"
          title="حذف حساب کاربری"
          text="آیا از حذف حساب کاربری خود مطمئن هستید؟"
          modalButtonColor="red"
          confirmText="بله حذف کن"
          cancelText="لغو"
          isLoading={deletingUser}
          onConfirm={handleDeleteAccount}
        >
          حذف حساب
        </Modal>
      </div>
    </>
  );
}

export default ProfileDashboard;
