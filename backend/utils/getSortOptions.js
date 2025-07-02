/**
 * 🏷️ GET SORTING OPTION FOR MONGOOSE
 * @private
 * @param {string} sortQuery - Sorting method from query params
 * @returns {object} Mongoose sort object
 */
export const getSortOptions = (sortQuery) => {
  switch (sortQuery) {
    case "newest": // Sort by newest first
      return { createdAt: -1 };
    case "price-low": // Sort by price low to high
      return { price: 1 };
    case "price-high": // Sort by price high to low
      return { price: -1 };
    case "top-rated": // Sort by highest rating
      return { rating: -1 };
    default: // Default sorting (newest first)
      return { createdAt: -1 };
  }
};
