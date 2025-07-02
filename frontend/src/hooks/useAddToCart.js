import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../store/slices/cart/cartSlice";

function useAddToCart() {
  const dispatch = useDispatch();

  function addToCartHandler(product, quantity) {
    dispatch(addToCart({ ...product, quantity }));
    toast.success(`${quantity} عدد ${product.name} به سبد خرید اضافه شد`);
  }
  return addToCartHandler;
}

export default useAddToCart;
