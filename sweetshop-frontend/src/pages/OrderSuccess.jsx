import { Link } from "react-router-dom";

function OrderSuccess() {

  return (

    <div className="container d-flex justify-content-center mt-5">

      <div
        className="card shadow-lg text-center p-5"
        style={{ maxWidth: "520px", width: "100%" }}
      >

        <div className="mb-3">

          <span style={{ fontSize: "60px" }}>
            🎉
          </span>

        </div>

        <h2 className="text-success fw-bold">
          Order Placed Successfully!
        </h2>

        <p className="mt-3 text-muted">
          Thank you for ordering from <strong>SweetShop</strong>.
        </p>

        <p className="text-muted">
          Your sweets will be prepared and delivered soon.
        </p>

        <div className="mt-4">

          <Link
            className="btn btn-primary me-2"
            to="/orders"
          >
            View Orders
          </Link>

          <Link
            className="btn btn-success"
            to="/sweets"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>

  );

}

export default OrderSuccess;