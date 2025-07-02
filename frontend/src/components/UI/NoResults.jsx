import { FaSearch, FaRegSadTear, FaFilter } from "react-icons/fa";
import { BiReset } from "react-icons/bi";

const NoResults = ({
  title = "محصولی یافت نشد",
  description,
  onResetFilters,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-6 p-4 bg-gray-100 rounded-full">
        <FaRegSadTear className="text-4xl text-gray-400" />
      </div>

      <h3 className="text-xl font-bold text-gray-700 mb-2">{title}</h3>

      <p className="text-gray-500 max-w-md mb-6">
        {description || (
          <>
            هیچ محصولی با مشخصات جستجو شده پیدا نشد.
            <br />
            می‌توانید فیلترها را تغییر دهید یا عبارت جستجو را اصلاح کنید.
          </>
        )}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="btn btn-outline flex items-center gap-2"
          >
            <BiReset />
            بازنشانی فیلترها
          </button>
        )}
      </div>

      <div className="mt-8 flex items-center text-sm text-gray-400">
        <FaFilter className="ml-1" />
        <span>برای نتیجه بهتر، فیلترهای کمتری اعمال کنید</span>
      </div>
    </div>
  );
};

export default NoResults;
