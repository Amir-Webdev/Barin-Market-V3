import { useNavigate } from "react-router-dom";
import {
  FaCheck,
  FaTruck,
  FaCreditCard,
  FaClipboardCheck,
  FaUser,
} from "react-icons/fa";

function CheckoutSteps({ step }) {
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: "ورود", path: "/login", icon: <FaUser /> },
    { id: 2, label: "اطلاعات ارسال", path: "/shipping", icon: <FaTruck /> },
    { id: 3, label: "پرداخت", path: "/payment", icon: <FaCreditCard /> },
    {
      id: 4,
      label: "ثبت سفارش",
      path: "/placeorder",
      icon: <FaClipboardCheck />,
    },
  ];

  return (
    <div className="w-full px-4 mb-8 flex justify-center">
      <div className="flex items-center justify-between w-full max-w-4xl relative">
        {steps.map(({ id, label, path, icon }, index) => (
          <div
            key={id}
            className="flex-1 flex flex-col items-center relative text-center z-10"
          >
            {/* Connector line */}
            {index !== 0 && (
              <div
                className={`absolute top-7 w-full h-1 ${
                  step >= id ? "bg-primary" : "bg-base-300"
                } right-1/2 translate-x-1/2 -z-10`}
              />
            )}

            {/* Step circle */}
            <button
              onClick={() => step >= id && navigate(path)}
              disabled={step < id}
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300
                ${
                  step >= id
                    ? "border-primary text-primary bg-white"
                    : "border-base-300 text-base-content opacity-50 cursor-not-allowed"
                }
                ${step === id ? "scale-110 ring ring-primary/40" : ""}
              `}
            >
              {step > id ? (
                <FaCheck className="text-success text-xl" />
              ) : (
                <span className="text-xl">{icon}</span>
              )}
            </button>

            {/* Label */}
            <span className="text-sm mt-2 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutSteps;
