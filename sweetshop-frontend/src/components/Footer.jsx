import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="bg-dark text-light mt-5">

      <div className="container py-4">

        <div className="row">

          {/* Brand */}

          <div className="col-md-4 text-center text-md-start">

            <h5>🍬 Sweet Shop</h5>

            <p className="text-muted">
              Fresh traditional Indian sweets made with love.
            </p>

          </div>


          {/* Quick Links */}

          <div className="col-md-4 text-center">

            <h6>Quick Links</h6>

            <ul className="list-unstyled">

              <li>
                <Link className="text-light text-decoration-none" to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className="text-light text-decoration-none" to="/sweets">
                  Sweets
                </Link>
              </li>

              <li>
                <Link className="text-light text-decoration-none" to="/cart">
                  Cart
                </Link>
              </li>

              <li>
                <Link className="text-light text-decoration-none" to="/orders">
                  Orders
                </Link>
              </li>

            </ul>

          </div>


          {/* Contact */}

          <div className="col-md-4 text-center text-md-end">

            <h6>Contact</h6>

            <p className="mb-1">📍 India</p>
            <p className="mb-1">📧 support@sweetshop.com</p>
            <p>📞 +91 XXXXX XXXXX</p>

          </div>

        </div>

        <hr className="border-secondary"/>

        <div className="text-center">

          <p className="mb-0">
            © 2026 Sweet Shop | Full Stack Project
          </p>

        </div>

      </div>

    </footer>

  );

}

export default Footer;