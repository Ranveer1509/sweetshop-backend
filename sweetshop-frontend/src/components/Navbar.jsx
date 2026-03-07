import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Sweet Shop
        </Link>

        <div className="navbar-nav">

          <Link className="nav-link" to="/sweets">
            Sweets
          </Link>

          <Link className="nav-link" to="/cart">
            Cart
          </Link>

          <Link className="nav-link" to="/orders">
            Orders
          </Link>

          <Link className="nav-link" to="/login">
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;