import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMyOrders, getInvoice } from "../api/orderService";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchOrders();

  }, [navigate]);


  const fetchOrders = async () => {

    try {

      const data = await getMyOrders();

      setOrders(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Failed to load orders:", error);

      alert("Failed to load orders");

    } finally {

      setLoading(false);

    }

  };


  /* Invoice */

  const handleInvoice = async (orderId) => {

    try {

      const invoice = await getInvoice(orderId);

      alert(
`🧾 Invoice

Order ID: ${invoice.orderId}

Subtotal: ₹${Number(invoice.subtotal).toLocaleString()}
Tax: ₹${Number(invoice.tax).toLocaleString()}

Total: ₹${Number(invoice.total).toLocaleString()}`
      );

    } catch (error) {

      console.error("Invoice error:", error);

      alert("Failed to generate invoice");

    }

  };


  /* Order Status Color */

  const getStatusColor = (status) => {

    switch (status) {

      case "PLACED":
        return "bg-secondary";

      case "PREPARING":
        return "bg-warning text-dark";

      case "SHIPPED":
        return "bg-info text-dark";

      case "DELIVERED":
        return "bg-success";

      default:
        return "bg-secondary";

    }

  };


  if (loading) {

    return (

      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
      </div>

    );

  }


  return (

    <div className="container mt-4">

      <h2 className="mb-4">📦 My Orders</h2>

      {orders.length === 0 ? (

        <div className="text-center mt-5">

          <p className="text-muted">
            You haven't placed any orders yet.
          </p>

          <Link className="btn btn-primary" to="/sweets">
            Browse Sweets
          </Link>

        </div>

      ) : (

        orders.map(order => (

          <div
            key={order.id}
            className="card p-4 mb-4 shadow-sm"
          >

            <div className="d-flex justify-content-between align-items-center">

              <h5>Order #{order.id}</h5>

              <span className={`badge ${getStatusColor(order.status)}`}>
                {order.status}
              </span>

            </div>

            {order.orderDate && (

              <p className="text-muted mb-2">
                Date: {new Date(order.orderDate).toLocaleString()}
              </p>

            )}

            <hr />

            <h6 className="mb-3">Items</h6>

            <ul className="list-group mb-3">

              {order.items?.map(item => (

                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >

                  <span>
                    {item.sweetName} × {item.quantity}
                  </span>

                  <span className="fw-bold">
                    ₹{Number(item.price).toLocaleString()}
                  </span>

                </li>

              ))}

            </ul>

            <div className="d-flex justify-content-between align-items-center">

              <h5>
                Total: ₹{Number(order.totalAmount).toLocaleString()}
              </h5>

              <button
                className="btn btn-outline-primary"
                onClick={() => handleInvoice(order.id)}
              >
                View Invoice
              </button>

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default Orders;