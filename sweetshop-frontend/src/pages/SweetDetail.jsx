import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getSweetById, getAllSweets } from "../api/sweetService";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function SweetDetail() {

  const { id } = useParams();

  const [sweet, setSweet] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    loadSweet();
  }, [id]);

  const loadSweet = async () => {

    try {

      const data = await getSweetById(id);
      setSweet(data);

      const res = await getAllSweets();
      const sweets = res?.data?.content || res?.data || [];

      const relatedSweets = sweets
        .filter((s) => s.id !== data.id)
        .slice(0, 4);

      setRelated(relatedSweets);

    } catch (error) {

      console.error("Failed to load sweet", error);

    } finally {

      setLoading(false);

    }

  };


  const handleQuantityChange = (value) => {

    const num = Number(value);

    if (num < 1) return setQuantity(1);
    if (num > sweet.quantity) return setQuantity(sweet.quantity);

    setQuantity(num);

  };


  const handleAddToCart = () => {

    for (let i = 0; i < quantity; i++) {
      addToCart(sweet);
    }

    toast.success(`${quantity} item(s) added to cart`);

  };


  if (loading) {

    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
      </div>
    );

  }

  if (!sweet) {

    return (
      <div className="container mt-5 text-center">
        <h4>Sweet not found</h4>
      </div>
    );

  }


  return (

    <div className="container mt-5">

      <div className="row">

        {/* Product Image */}

        <div className="col-md-6 text-center">

          <img
            src={
              sweet.imageUrl ||
              "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
            }
            alt={sweet.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/400x300?text=Sweet")
            }
          />

        </div>


        {/* Product Details */}

        <div className="col-md-6">

          <h2 className="mb-2">{sweet.name}</h2>

          <p className="text-warning fs-5">
            ⭐ {sweet.rating || 4.5} / 5
          </p>

          <h3 className="text-success">
            ₹{Number(sweet.price).toLocaleString()}
            <span className="badge bg-danger ms-3">
              20% OFF
            </span>
          </h3>

          <p className="text-muted">
            Category: <strong>{sweet.category}</strong>
          </p>

          <hr />

          <p>
            Enjoy delicious traditional Indian sweets made with premium ingredients.
            Perfect for festivals, celebrations, and gifting.
          </p>

          <p>
            <strong>Stock Available:</strong> {sweet.quantity}
          </p>


          {/* Quantity Selector */}

          <div className="d-flex align-items-center mt-3">

            <span className="me-2">Quantity:</span>

            <input
              type="number"
              min="1"
              max={sweet.quantity}
              value={quantity}
              onChange={(e)=>handleQuantityChange(e.target.value)}
              className="form-control"
              style={{ width: "80px" }}
            />

          </div>


          {/* Add To Cart */}

          <button
            className="btn btn-success btn-lg mt-4"
            disabled={sweet.quantity === 0}
            onClick={handleAddToCart}
          >

            {sweet.quantity === 0
              ? "Out of Stock"
              : "Add to Cart"}

          </button>

        </div>

      </div>


      {/* Related Sweets */}

      <div className="mt-5">

        <h4 className="mb-4">You may also like</h4>

        <div className="row">

          {related.map((s) => (

            <div className="col-md-3 mb-3" key={s.id}>

              <Link
                to={`/sweet/${s.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >

                <div className="card p-3 shadow-sm h-100">

                  <img
                    src={
                      s.imageUrl ||
                      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                    }
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />

                  <div className="card-body text-center">

                    <h6>{s.name}</h6>

                    <p className="text-success fw-bold">
                      ₹{Number(s.price).toLocaleString()}
                    </p>

                  </div>

                </div>

              </Link>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default SweetDetail;