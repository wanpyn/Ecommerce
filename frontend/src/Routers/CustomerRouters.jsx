import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../customer/pages/HomePage";
import CartPage from "../customer/pages/CartPage";
import Header from "../customer/components/Header";
import Footer from "../customer/components/Footer";
import ProductPage from "../customer/pages/ProductsPage";
import ProductDetails from "../customer/pages/ProductDetails";
import CheckoutPage from "../customer/pages/CheckoutPage";
import OrdersPage from "../customer/pages/OrdersPage";
import OrderDetails from "../customer/pages/OrderDetails";
import CustomerSignup from "../customer/pages/signupPage/signup";

const CustomerRouters = () => {
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  const location = useLocation();

  // Check if the current path matches any of the excluded paths
  const excludedPaths = ["/signup"];
  const showSidebar = !excludedPaths.includes(location.pathname);

  return (
    <div>
      <div>{showSidebar && <Header />}</div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<CustomerSignup />}></Route>
        <Route
          path="/:levelOne/:levelTwo/:levelThree"
          element={<ProductPage />}
        ></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="/account/order" element={<OrdersPage />}></Route>
        <Route
          path="/account/order/:orderId"
          element={<OrderDetails />}
        ></Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
