import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../store/slices/cart/cartSlice";
import CheckoutSteps from "../components/Order/CheckoutSteps.jsx";
import SEOMeta from "../components/Util/SEOMeta.jsx";
import Button from "../components/UI/Button.jsx";

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

      <div className="max-w-xl mx-auto my-4 px-4 py-6">
        <CheckoutSteps step={2} />

        <h1 className="text-2xl font-bold text-center mb-12">اطلاعات ارسال</h1>

        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-[6rem_1fr] items-center justify-items-center gap-6">
            <label htmlFor="address" className="font-medium">
              آدرس:
            </label>
            <input
              type="text"
              id="address"
              placeholder="آدرس را وارد کنید"
              value={shippingAddressForm.address}
              onChange={handleChange}
              className="input input-bordered"
              required
            />

            <label htmlFor="city" className="font-medium">
              شهر:
            </label>
            <input
              type="text"
              id="city"
              placeholder="شهر را وارد کنید"
              value={shippingAddressForm.city}
              onChange={handleChange}
              className="input input-bordered"
              required
            />

            <label htmlFor="postalCode" className="font-medium">
              کد پستی:
            </label>
            <input
              type="text"
              id="postalCode"
              placeholder="کد پستی را وارد کنید"
              value={shippingAddressForm.postalCode}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="flex justify-center mt-8">
            <Button type="submit" size="lg">
              ادامه
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Shipping;
