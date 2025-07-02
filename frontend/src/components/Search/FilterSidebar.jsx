// FilterSidebar.jsx
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useGetProductFiltersQuery } from "../../store/slices/api/productApiSlice";
import { FaFilter, FaTimes, FaStar } from "react-icons/fa";
import Loader from "../UI/Loader";
import { formatNumber } from "../../utils/toPersianDigits";

const FilterSidebar = ({ filters, setFilters, mobileOpen, setMobileOpen }) => {
  const {
    data: filterOptions,
    isLoading,
    isError,
  } = useGetProductFiltersQuery();
  const [priceValue, setPriceValue] = useState(filters.price || 0);

  // Sync price value with filters
  useEffect(() => {
    if (filters.price !== priceValue) {
      setPriceValue(filters.price || filterOptions?.priceRange?.max || 0);
    }
  }, [filters.price, filterOptions?.priceRange?.max]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === prev[key] ? null : value,
    }));
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceValue(value);
    // Add debounce or update on mouse up for better performance
  };

  const handlePriceCommit = () => {
    handleFilterChange("price", priceValue);
  };

  const clearFilters = () => {
    setFilters({
      category: null,
      brand: null,
      price: null,
      rating: null,
      sort: null,
    });
    setPriceValue(filterOptions?.priceRange?.max || 0);
  };

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-500">خطا در دریافت فیلترها</div>;

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md ${
        mobileOpen
          ? "fixed inset-0 z-50 overflow-y-auto md:hidden"
          : "hidden md:block"
      }`}
    >
      {mobileOpen && (
        <div className="sticky top-0 bg-white py-3 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold flex items-center">
            <FaFilter className="ml-2" /> فیلترها
          </h3>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-6 mt-2">
        <h3 className="text-lg font-bold flex items-center md:mt-0">
          <FaFilter className="ml-2" /> فیلترها
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:underline"
          disabled={Object.values(filters).every((val) => val === null)}
        >
          حذف همه فیلترها
        </button>
      </div>

      <div className="space-y-6">
        {/* Sort Options */}
        <div>
          <h4 className="font-medium mb-3">مرتب سازی</h4>
          <select
            value={filters.sort || ""}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="select select-bordered select-sm w-full"
          >
            <option value="">پیش فرض</option>
            <option value="newest">جدیدترین</option>
            <option value="price-low">ارزان ترین</option>
            <option value="price-high">گران ترین</option>
            <option value="top-rated">پربازدیدترین</option>
          </select>
        </div>

        {/* Category Filter */}
        {filterOptions?.categories?.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">دسته بندی</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filterOptions.categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`cat-${category}`}
                    checked={filters.category === category}
                    onChange={() => handleFilterChange("category", category)}
                    className="checkbox checkbox-sm checkbox-primary ml-2"
                  />
                  <label htmlFor={`cat-${category}`} className="cursor-pointer">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Brand Filter */}
        {filterOptions?.brands?.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">برند</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filterOptions.brands.map((brand) => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={filters.brand === brand}
                    onChange={() => handleFilterChange("brand", brand)}
                    className="checkbox checkbox-sm checkbox-primary ml-2"
                  />
                  <label htmlFor={`brand-${brand}`} className="cursor-pointer">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Filter */}
        {filterOptions?.priceRange && (
          <div>
            <h4 className="font-medium mb-3">
              قیمت:{" "}
              {filters.price
                ? `تا ${formatNumber(filters.price)} تومان`
                : "همه"}
            </h4>
            <input
              type="range"
              min={filterOptions.priceRange.min}
              max={filterOptions.priceRange.max}
              value={priceValue}
              onChange={handlePriceChange}
              onMouseUp={handlePriceCommit}
              onTouchEnd={handlePriceCommit}
              className="range range-primary range-sm w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatNumber(filterOptions.priceRange.min)}</span>
              <span>{formatNumber(filterOptions.priceRange.max)}</span>
            </div>
          </div>
        )}

        {/* Rating Filter */}
        <div>
          <h4 className="font-medium mb-3">امتیاز</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <input
                  type="checkbox"
                  id={`rating-${star}`}
                  checked={filters.rating === star}
                  onChange={() => handleFilterChange("rating", star)}
                  className="checkbox checkbox-sm checkbox-primary ml-2"
                />
                <label
                  htmlFor={`rating-${star}`}
                  className="cursor-pointer flex items-center"
                >
                  {Array.from({ length: star }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                  <span className="text-gray-500 text-xs mr-1">به بالا</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

FilterSidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool,
  setMobileOpen: PropTypes.func,
};

FilterSidebar.defaultProps = {
  mobileOpen: false,
  setMobileOpen: () => {},
};

export default FilterSidebar;
