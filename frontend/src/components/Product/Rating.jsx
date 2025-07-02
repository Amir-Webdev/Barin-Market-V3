import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { toPersianDigits } from "../../utils/toPersianDigits";

function Rating({ value, text }) {
  const renderStar = (index) => {
    if (value >= index) return <FaStar className="text-yellow-400" />;
    if (value >= index - 0.5)
      return <FaStarHalfAlt className="text-yellow-400" />;
    return <FaRegStar className="text-yellow-400" />;
  };

  return (
    <div className="flex flex-row-reverse items-center gap-1 text-sm rtl">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{renderStar(i)}</span>
      ))}
      {text && (
        <span className="text-gray-600 mr-2">
          {toPersianDigits(text.split(" ")[0])} نظر
        </span>
      )}
    </div>
  );
}

export default Rating;
