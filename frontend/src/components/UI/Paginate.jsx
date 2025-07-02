import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronLeft, FaEllipsisH } from "react-icons/fa";
import { formatNumber, toPersianDigits } from "../../utils/toPersianDigits";

function Paginate({ pages, page, setPage }) {
  return (
    <div className="mt-8 flex justify-center">
      <div className="join">
        {/* Previous Button */}
        <button
          className="join-item btn bg-white hover:bg-surface"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          «
        </button>

        {/* Page Numbers */}
        {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`join-item btn hover:bg-surface ${
              page === pageNum ? "btn-active" : ""
            } ${page === pageNum ? "!bg-primary text-white" : "bg-white"}`}
            onClick={() => setPage(pageNum)}
            disabled={page === pageNum}
          >
            {toPersianDigits(pageNum)}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="join-item btn bg-white hover:bg-surface"
          onClick={() => setPage(page + 1)}
          disabled={page === pages}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default Paginate;
