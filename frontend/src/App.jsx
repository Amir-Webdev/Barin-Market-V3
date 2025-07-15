import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/assets/styles/toastify.css";
import { Suspense, lazy, useState } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/Util/PrivateRoute";
import AdminRoute from "./components/Util/AdminRoute";
import ScrollToTop from "./components/Util/ScrollToTop";

// Eagerly loaded (critical or lightweight pages)
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Fallback from "./components/Util/Fallback";
import MobileNav from "./components/Mobile/MobileNav";
import { useSelector } from "react-redux";
import MobileMenu from "./components/Mobile/MobileMenu";
import AppLayout from "./components/UI/AppLayout";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Lazily loaded pages
const Cart = lazy(() => import("./pages/Cart"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProductSearchPage = lazy(() => import("./pages/ProductSearchPage"));
const Products = lazy(() => import("./pages/Products"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Payment = lazy(() => import("./pages/Payment"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Order = lazy(() => import("./pages/Order"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Profile = lazy(() => import("./pages/Profile"));
const OrderList = lazy(() => import("./pages/admin/OrderList"));
const ProductList = lazy(() => import("./pages/admin/ProductList"));
const ProductEdit = lazy(() => import("./pages/admin/ProductEdit"));
const UserList = lazy(() => import("./pages/admin/UserList"));
const UserEdit = lazy(() => import("./pages/admin/UserEdit"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <MobileNav setMobileMenuOpen={setMobileMenuOpen} userInfo={userInfo} />
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          userInfo={userInfo}
        />
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/search/:keyword" element={<ProductSearchPage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route element={<PrivateRoute />}>
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route path="/order/:orderId" element={<Order />} />
                <Route
                  path="/payment-success/:orderId"
                  element={<PaymentSuccess />}
                />
                <Route path="/profile" element={<Dashboard />} />
                <Route path="/profile?tab" element={<Dashboard />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="/admin/orderlist" element={<OrderList />} />
                <Route path="/admin/productlist" element={<ProductList />} />
                <Route
                  path="/admin/productlist/:pageNumber"
                  element={<ProductList />}
                />
                <Route
                  path="/admin/product/:id/edit"
                  element={<ProductEdit />}
                />
                <Route path="/admin/userlist" element={<UserList />} />
                <Route path="/admin/user/:id/edit" element={<UserEdit />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer
        rtl
        style={{
          fontFamily: "Vazirmatn",
        }}
      />
    </>
  );
}

export default App;
