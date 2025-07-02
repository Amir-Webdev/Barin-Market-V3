import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../store/slices/cart/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import SEOMeta from "../components/Util/SEOMeta.jsx";

function Shipping() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [shippingAddressForm, setShippingAddressForm] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    setShippingAddressForm({
      ...shippingAddressForm,
      [e.target.id]: e.target.value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingAddressForm));
    navigate("/payment");
  }

  return (
    <>
      <SEOMeta
        title="اطلاعات ارسال | فروشگاه بارین"
        description="آدرس خود را وارد کنید تا سفارش شما تکمیل شود."
        keywords="ارسال, خرید آنلاین, فروشگاه بارین"
        canonical={window.location.href}
        openGraph={{
          title: "اطلاعات ارسال | فروشگاه بارین",
          description: "آدرس خود را وارد کنید تا سفارش شما تکمیل شود.",
          url: window.location.href,
        }}
      />

      <div className="max-w-xl mx-auto px-4 py-6">
        <CheckoutSteps step={2} />

        <h1 className="text-2xl font-bold text-center mb-6">اطلاعات ارسال</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          {["address", "city", "postalCode"].map((field) => (
            <div key={field} className="flex flex-col text-right">
              <label htmlFor={field} className="mb-1 font-medium">
                {field === "address"
                  ? "آدرس:"
                  : field === "city"
                  ? "شهر:"
                  : "کد پستی:"}
              </label>
              <input
                type="text"
                id={field}
                placeholder={`${
                  field === "address"
                    ? "آدرس را وارد کنید"
                    : field === "city"
                    ? "شهر را وارد کنید"
                    : "کد پستی را وارد کنید"
                }`}
                value={shippingAddressForm[field]}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-full mt-4">
            ادامه
          </button>
        </form>
      </div>
    </>
  );
}

export default Shipping;
