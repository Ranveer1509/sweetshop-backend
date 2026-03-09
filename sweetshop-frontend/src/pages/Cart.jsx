import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../api/orderService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {

  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    cartTotal
  } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCheckout = async () => {

    if (cartItems.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }

    if (loading) return;

    try {

      setLoading(true);

      await placeOrder(cartItems);

      clearCart();

      toast.success("🎉 Order placed successfully!");

      navigate("/order-success");

    } catch (error) {

      console.error("Order failed:", error);

      toast.error(
        error?.message || "❌ Order failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (

        <div className="text-center mt-5">

          <h5 className="text-muted mb-3">Your cart is empty</h5>

          <Link className="btn btn-primary" to="/sweets">
            Browse Sweets
          </Link>

        </div>

      ) : (

        <div>

          {cartItems.map(item => {

            const subtotal = item.price * item.quantity;

            return (

              <div className="card p-3 mb-3 shadow-sm" key={item.id}>

                <div className="row align-items-center">

                  {/* Image */}

                  <div className="col-md-2 text-center">

                    <img
                      src={item.imageUrl || "https://via.placeholder.com/120x80?text=Sweet"}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: "80px", objectFit: "cover" }}
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/120x80?text=Sweet")
                      }
                    />

                  </div>


                  {/* Product Info */}

                  <div className="col-md-4">

                    <h5>{item.name}</h5>

                    <p className="mb-1">
                      Price: ₹{Number(item.price).toLocaleString()}
                    </p>

                    <p className="text-muted">
                      Subtotal: ₹{subtotal.toLocaleString()}
                    </p>

                  </div>


                  {/* Quantity Controls */}

                  <div className="col-md-3 d-flex align-items-center gap-2">

                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>

                    <span className="fw-bold">
                      {item.quantity}
                    </span>

                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>

                  </div>


                  {/* Remove Button */}

                  <div className="col-md-3 text-end">

                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

          <hr />


          {/* Checkout Section */}

          <div className="d-flex justify-content-between align-items-center">

            <h4>
              Total: ₹{Number(cartTotal).toLocaleString()}
            </h4>

            <button
              className="btn btn-success"
              disabled={loading}
              onClick={handleCheckout}
            >

              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}

            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default Cart;