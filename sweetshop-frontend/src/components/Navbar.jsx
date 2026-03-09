import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {

  const { cartItems = [], cartCount, clearCart } = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isLoggedIn = !!token;

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    clearCart?.();

    navigate("/login");

  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

      <div className="container">

        {/* Logo */}

        <Link className="navbar-brand fw-bold fs-4" to="/">
          🍬 SweetShop
        </Link>


        {/* Mobile Toggle */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >

          <span className="navbar-toggler-icon"></span>

        </button>


        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Left Menu */}

          <ul className="navbar-nav me-auto">

            <li className="nav-item">

              <Link
                className={`nav-link ${isActive("/") ? "active fw-bold" : ""}`}
                to="/"
              >
                Home
              </Link>

            </li>

            <li className="nav-item">

              <Link
                className={`nav-link ${isActive("/sweets") ? "active fw-bold" : ""}`}
                to="/sweets"
              >
                Sweets
              </Link>

            </li>

            {isLoggedIn && (

              <li className="nav-item">

                <Link
                  className={`nav-link ${isActive("/orders") ? "active fw-bold" : ""}`}
                  to="/orders"
                >
                  Orders
                </Link>

              </li>

            )}

            {/* Admin Menu */}

            {role === "ADMIN" && (

              <li className="nav-item">

                <Link
                  className={`nav-link ${isActive("/admin") ? "active fw-bold" : ""}`}
                  to="/admin"
                >
                  Admin
                </Link>

              </li>

            )}

          </ul>


          {/* Right Menu */}

          <ul className="navbar-nav align-items-center">

            {isLoggedIn && (

              <li className="nav-item me-3 position-relative">

                <Link className="nav-link position-relative" to="/cart">

                  🛒 Cart

                  {cartCount > 0 && (

                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.65rem" }}
                    >

                      {cartCount}

                    </span>

                  )}

                </Link>

              </li>

            )}

            {!isLoggedIn && (

              <>
                <li className="nav-item me-2">

                  <Link className="btn btn-outline-light" to="/login">
                    Login
                  </Link>

                </li>

                <li className="nav-item">

                  <Link className="btn btn-warning" to="/register">
                    Register
                  </Link>

                </li>
              </>

            )}

            {isLoggedIn && (

              <li className="nav-item">

                <button
                  className="btn btn-danger ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </li>

            )}

          </ul>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;