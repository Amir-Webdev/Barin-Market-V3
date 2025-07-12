import { useEffect, useState } from "react";
import CheckoutSteps from "../components/Order/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../store/slices/cart/cartSlice";
import SEOMeta from "../components/Util/SEOMeta.jsx";
import Button from "../components/UI/Button.jsx";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("ZarinPal");
  const { shippingAddress } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shippingAddress) navigate("/shipping");
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <SEOMeta
        title="روش پرداخت | بارین مارکت"
        description="روش پرداخت مورد نظر خود را انتخاب کنید تا خریدتان را تکمیل نمایید"
        keywords="پرداخت, روش پرداخت, فروشگاه اینترنتی, بارین مارکت"
        canonical={window.location.href}
        openGraph={{
          title: "روش پرداخت | بارین مارکت",
          description:
            "روش پرداخت مورد نظر خود را انتخاب کنید تا خریدتان را تکمیل نمایید",
          url: window.location.href,
        }}
      />

      <div className="max-w-xl mx-auto my-4 px-4 py-6">
        <CheckoutSteps step={3} />
        <h1 className="text-2xl font-semibold mb-6 text-center">روش پرداخت</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label htmlFor="paymentMethod" className="block text-lg mb-2">
              روش پرداخت را انتخاب کنید
            </label>
            <div className="space-y-3 text-right">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="ZarinPal"
                  name="paymentMethod"
                  value="ZarinPal"
                  checked={paymentMethod === "ZarinPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="radio radio-info"
                />
                <label htmlFor="ZarinPal" className="text-lg">
                  زرین‌پال
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit">ادامه</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Payment;
