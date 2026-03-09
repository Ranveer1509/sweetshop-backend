import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

/* ================= CONTEXT ================= */
import { CartProvider } from "./context/CartContext.jsx";

/* ================= STYLES ================= */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

/* ================= TOAST ================= */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


/* ================= ROOT ELEMENT ================= */

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);


/* ================= APP RENDER ================= */

root.render(
  <React.StrictMode>

    {/* Global Cart State */}
    <CartProvider>

      <App />

      {/* Global Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        draggable
        theme="colored"
        limit={3}
      />

    </CartProvider>

  </React.StrictMode>
);