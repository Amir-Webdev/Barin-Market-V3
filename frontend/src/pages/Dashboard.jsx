import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import AddressDashboard from "../components/Dashboard/AddressDashboard";
import OrderDashboard from "../components/Dashboard/OrderDashboard";
import WishlistDashboard from "../components/Dashboard/WishlistDashboard";
import CommentDashboard from "../components/Dashboard/CommentDashboard";
import ContactSupportDashboard from "../components/Dashboard/ContactSupportDashboard";
import ProfileDashboard from "../components/Dashboard/ProfileDashboard";
import { useSelector } from "react-redux";
import OrderList from "./admin/OrderList";
import ProductList from "./admin/ProductList";
import UserList from "./admin/UserList";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const userId = userInfo._id;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl ? tabFromUrl : "profile");
  }, [location.search]);

  return (
    <div className=" flex flex-col md:flex-row md:justify-start h-screen">
      {/* SideBar */}
      <div className="md:w-56">
        <DashboardSidebar userInfo={userInfo} />
      </div>
      {tab === "profile" && <ProfileDashboard userInfo={userInfo} />}
      {tab === "address" && <AddressDashboard />}
      {tab === "orders" && <OrderDashboard />}
      {tab === "wishlist" && <WishlistDashboard userId={userId} />}
      {tab === "comments" && <CommentDashboard userId={userId} />}
      {tab === "support" && <ContactSupportDashboard />}
      {tab === "productlist" && <ProductList />}
      {tab === "orderlist" && <OrderList />}
      {tab === "userlist" && <UserList />}
      {!tab && <div>لطفا یکی از داشبورد ها را انتخاب کنید</div>}
    </div>
  );
}

export default Dashboard;
