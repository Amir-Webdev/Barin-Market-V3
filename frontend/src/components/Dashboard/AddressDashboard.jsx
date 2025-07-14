import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useUpdateProfileMutation } from "../../store/slices/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/auth/authSlice";
import { toast } from "react-toastify";
import Button from "../UI/Button";
import SEOMeta from "../Util/SEOMeta";
import Message from "../UI/Message";

const AddressDashboard = () => {
  const [addresses, setAddresses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    title: "",
  });

  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setAddresses(userInfo?.addresses || []);
  }, []);

  const openModal = (index = null) => {
    setEditIndex(index);
    setFormData(
      index !== null
        ? addresses[index]
        : { address: "", city: "", postalCode: "", title: "" }
    );
    setModalOpen(true);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "postalCode" ? parseInt(value) : value,
    }));
  };

  const handleSave = async () => {
    const updated = [...addresses];
    if (editIndex !== null) updated[editIndex] = formData;
    else updated.push(formData);

    try {
      const userInfo = await updateProfile({ addresses: updated }).unwrap();
      dispatch(setCredentials(userInfo));
      setAddresses(updated);
      setModalOpen(false);
      toast.success("آدرس‌های شما با موفقیت بروز شدند");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "خطا در ذخیره‌سازی آدرس‌ها. لطفا دوباره تلاش کنید."
      );
    }
  };

  return (
    <>
      <SEOMeta title=" لیست آدرس ها | بارین مارکت" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center gap-6">
          <h2 className="text-2xl font-semibold">آدرس‌های من</h2>
          <Button size="sm" onClick={() => openModal()}>
            <FaPlus className="ml-1" /> افزودن آدرس جدید
          </Button>
        </div>

        {addresses.length === 0 ? (
          <Message>هیچ آدرسی ثبت نشده است.</Message>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr, index) => (
              <div key={index} className="card border border-border">
                <div className="card-body">
                  <p>
                    <span className="font-semibold">عنوان آدرس:</span>{" "}
                    {addr.title}
                  </p>
                  <p>
                    <span className="font-semibold">آدرس:</span> {addr.address}
                  </p>
                  <p>
                    <span className="font-semibold">شهر:</span> {addr.city}
                  </p>
                  <p>
                    <span className="font-semibold">کد پستی:</span>{" "}
                    {addr.postalCode}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => openModal(index)}
                    >
                      <FaEdit className="ml-1" /> ویرایش
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <input
          type="checkbox"
          className="modal-toggle"
          checked={modalOpen}
          readOnly
        />
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
          <div className="modal-box bg-background">
            <h3 className="font-bold text-lg mb-4">
              {editIndex !== null ? "ویرایش آدرس" : "افزودن آدرس جدید"}
            </h3>

            {["title", "city", "postalCode", "address"].map((field, i) => (
              <div className="form-control mb-3 flex flex-col gap-2" key={i}>
                <label className="label">
                  {`${
                    field === "title"
                      ? "عنوان آدرس"
                      : field === "address"
                      ? "آدرس"
                      : field === "city"
                      ? "شهر"
                      : "کد پستی"
                  } :`}
                </label>
                {field === "postalCode" ||
                field === "title" ||
                field === "city" ? (
                  <input
                    type={field === "postalCode" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`input bg-background border border-border ${
                      field === "address" && "h-24 p-3"
                    }`}
                    disabled={isLoading}
                  />
                ) : (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-24 p-3 resize-none break-words whitespace-pre-wrap bg-background border border-border"
                  />
                )}
              </div>
            ))}

            <div className="modal-action">
              <Button color="red" onClick={() => setModalOpen(false)}>
                انصراف
              </Button>
              <Button color="green" onClick={handleSave}>
                {editIndex !== null ? "ذخیره تغییرات" : "ذخیره"}
              </Button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default AddressDashboard;
