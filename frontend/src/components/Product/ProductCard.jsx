import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/toPersianDigits.js";
import useAddToCart from "../../hooks/useAddToCart.js";

const FALLBACK_IMAGE =
  "https://ecommerce-v1.s3.ir-thr-at1.arvanstorage.ir/Default%2Fphone-placeholder.avif?versionId=";

function ProductCard({ product }) {
  const addToCart = useAddToCart();

  return (
    <Link
      to={`/product/${product?._id}`}
      className="card bg-background shadow-sm border rounded-2xl h-full"
    >
      <figure className="p-5 h-52 flex justify-center items-center w-full">
        <img
          src={product.images[0]}
          alt={`${product.name} تصویر`}
          className="rounded-2xl w-full h-full object-contain"
        />
      </figure>
      <div className="card-body text-right space-y-1">
        <div className="flex gap-2 items-start justify-between">
          <h2 className="card-title text-base line-clamp-2 h-10 leading-8 font-semibold">
            {product.name}
          </h2>
          <button
            className="btn rounded-full text-xl bg-slate-800 text-white px-[0.9rem] py-4"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
          >
            +
          </button>
        </div>
        <p>{product.brand}</p>
        <p className="font-semibold text-base">
          {formatNumber(product.price)} تومان
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
