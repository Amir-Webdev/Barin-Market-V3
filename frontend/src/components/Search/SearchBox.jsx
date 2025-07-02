// components/search/SearchBox.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="جستجوی محصولات..."
        className="input input-bordered w-full pr-10 bg-gray-50 border-primary rounded-xl"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        dir="rtl"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;
