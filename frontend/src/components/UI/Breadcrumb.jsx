import { Link } from "react-router-dom";

function Breadcrumb({ product }) {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to="/">خانه</Link>
        </li>
        <li>
          <Link to="/products">محصولات</Link>
        </li>
        <li>
          <span className="text-primary">{product.category}</span>
        </li>
        <li className="font-semibold">{product.name}</li>
      </ul>
    </div>
  );
}

export default Breadcrumb;
