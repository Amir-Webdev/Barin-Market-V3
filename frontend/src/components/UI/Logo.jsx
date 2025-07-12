import { Link } from "react-router-dom";
import { LOGO_URL } from "../../constants/constants";

function Logo({ size = "sm" }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={LOGO_URL}
        alt="بارین مارکت"
        className={`${size === "sm" ? "h-8 w-8" : "h-16 w-16"} object-contain`}
        onError={(e) => {
          e.target.src = "/placeholder-logo.png";
          e.target.className = `${
            size === "sm" ? "h-8 w-8" : "h-16 w-16"
          } object-contain bg-gray-100 rounded-full`;
        }}
      />
      <span
        className={`${
          size === "sm" ? "text-lg" : "text-2xl"
        } font-bold text-primary`}
      >
        بارین مارکت
      </span>
    </Link>
  );
}

export default Logo;
