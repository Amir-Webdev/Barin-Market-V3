import {
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
  HiOutlineXCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { useState } from "react";

function Message({
  type = "info",
  children,
  title,
  dismissible = false,
  outline = true,
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="p-6">
      {/*  CHANGE ICONS TO HERO ICONS OUTLINE  */}

      <div
        className={`alert ${
          type === "error"
            ? "alert-error"
            : type === "success"
            ? "alert-success"
            : type === "warning"
            ? "alert-warning"
            : "alert-info"
        } shadow-md relative ${outline && "alert-outline"}`}
        role="alert"
      >
        {type === "error" && <HiOutlineXCircle className="w-5 h-5" />}
        {type === "info" && <HiOutlineInformationCircle className="w-5 h-5" />}
        {type === "warning" && (
          <HiOutlineExclamationCircle className="w-5 h-5" />
        )}
        {type === "success" && <HiOutlineCheckCircle className="w-5 h-5" />}
        <div>
          {title && <h3 className="font-bold mb-0.5">{title}</h3>}
          <p>{children}</p>
        </div>
        {dismissible && (
          <button
            className="absolute top-2 end-2 text-lg"
            onClick={() => setVisible(false)}
          >
            <IoMdClose />
          </button>
        )}
      </div>
    </div>
  );
}

export default Message;
