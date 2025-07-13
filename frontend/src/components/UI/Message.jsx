import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineError } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const typeMap = {
  info: {
    color: "info",
    icon: <AiOutlineInfoCircle className="w-5 h-5" />,
  },
  success: {
    color: "success",
    icon: <BiCheckCircle className="w-5 h-5" />,
  },
  danger: {
    color: "error",
    icon: <MdOutlineError className="w-5 h-5" />,
  },
};

function Message({ type = "info", children, title, dismissible = false }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const { color, icon } = typeMap[type] || typeMap.info;

  return (
    <div className="p-6">
      <div className={`alert alert-${color} shadow-md relative`} role="alert">
        {icon}
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
