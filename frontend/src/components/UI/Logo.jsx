import { Link } from "react-router-dom";
import { LOGO_URL } from "../../constants/constants";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={LOGO_URL}
        alt="بارین مارکت"
        className="h-8 w-8 object-contain"
        onError={(e) => {
          e.target.src = "/placeholder-logo.png";
          e.target.className =
            "h-8 w-8 object-contain bg-gray-100 rounded-full";
        }}
      />
      <span className="text-lg font-bold text-primary">بارین مارکت</span>
    </Link>
  );
}

export default Logo;
