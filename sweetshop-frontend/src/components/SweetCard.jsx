import { Link } from "react-router-dom";
import defaultSweet from "../assets/sweets/default_sweet.jpg";

function SweetCard({ sweet, image, addToCart }) {

  const fallbackImage = defaultSweet;

  const handleAdd = (e) => {

    e.preventDefault();

    if (!sweet || sweet.quantity === 0) return;

    addToCart(sweet);

  };

  const price = Number(sweet?.price || 0).toLocaleString();

  return (

    <div className="sweet-card card shadow-sm h-100">

      {/* IMAGE */}

      <Link
        to={`/sweet/${sweet.id}`}
        className="text-decoration-none text-dark"
      >

        <img
          src={image || fallbackImage}
          alt={sweet.name}
          className="card-img-top"
          style={{
            height: "200px",
            width: "100%",
            objectFit: "cover"
          }}
          loading="lazy"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />

      </Link>

      <div className="card-body d-flex flex-column">

        {/* Name */}

        <Link
          to={`/sweet/${sweet.id}`}
          className="text-decoration-none text-dark"
        >

          <h5 className="fw-semibold">
            {sweet.name}
          </h5>

        </Link>

        {/* Rating */}

        <p className="text-warning mb-1">
          ⭐ {sweet.rating || 4.5}
        </p>

        {/* Category */}

        <span className="badge bg-warning text-dark mb-2">
          {sweet.category}
        </span>

        {/* Price */}

        <p className="fw-bold text-success fs-5 mb-1">
          ₹{price}
        </p>

        {/* Discount */}

        <span className="badge bg-danger mb-2">
          20% OFF
        </span>

        {/* Stock */}

        <p className="small text-muted mb-3">
          Stock: {sweet.quantity}
        </p>

        {/* Add to Cart */}

        <button
          className="btn btn-success mt-auto"
          disabled={sweet.quantity === 0}
          onClick={handleAdd}
        >

          {sweet.quantity === 0
            ? "Out of Stock"
            : "Add to Cart"}

        </button>

      </div>

    </div>

  );

}

export default SweetCard;