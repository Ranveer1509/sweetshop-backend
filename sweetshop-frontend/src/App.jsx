import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Sweets from "./pages/Sweets";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import SweetDetail from "./pages/SweetDetail";

import AdminDashboard from "./pages/AdminDashboard";
import AdminManageSweets from "./pages/AdminManageSweets";
import AdminOrders from "./pages/AdminOrders";

import OrderSuccess from "./pages/OrderSuccess";


/* Scroll To Top */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


/* Auth Helpers */

const isAuthenticated = () => !!localStorage.getItem("token");

const isAdmin = () => {
  const role = localStorage.getItem("role");
  return role === "ADMIN";
};


/* Protected Routes */

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <Navigate to="/" replace />;
  return children;
};


/* 404 */

const NotFound = () => (
  <div className="text-center mt-5">
    <h2 className="fw-bold">404</h2>
    <p className="text-muted">Page not found</p>
  </div>
);


function App() {

  return (
    <BrowserRouter>

      <ScrollToTop />

      <Navbar />

      {/* FIXED MAIN WRAPPER */}
      <main style={{ minHeight: "80vh" }}>

        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route
            path="/sweets"
            element={
              <PrivateRoute>
                <Sweets />
              </PrivateRoute>
            }
          />

          <Route
            path="/sweet/:id"
            element={
              <PrivateRoute>
                <SweetDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />

          <Route
            path="/order-success"
            element={
              <PrivateRoute>
                <OrderSuccess />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/sweets"
            element={
              <AdminRoute>
                <AdminManageSweets />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>

      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;