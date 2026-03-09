import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/orderService";

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      setLoading(true);

      const data = await getAllOrders();

      setOrders(Array.isArray(data) ? data : []);
      setError(false);

    } catch (err) {

      console.error("Failed to load orders", err);
      setError(true);

    } finally {

      setLoading(false);

    }

  };


  /* Update Order Status */

  const handleStatusChange = async (orderId, status) => {

    try {

      await updateOrderStatus(orderId, status);

      /* Update UI without reload */

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      );

      alert("Order status updated");

    } catch (err) {

      console.error("Failed to update status", err);
      alert("Failed to update order");

    }

  };


  /* Status Badge Color */

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

  if (error) {

    return (
      <div className="text-center mt-5">
        <h4>Failed to load orders</h4>
        <button className="btn btn-warning mt-3" onClick={loadOrders}>
          Retry
        </button>
      </div>
    );

  }


  return (

    <div className="container mt-4">

      <h2 className="mb-4">📦 All Orders</h2>

      {orders.length === 0 ? (

        <div className="text-center">
          <p>No orders found</p>
        </div>

      ) : (

        orders.map(order => (

          <div key={order.id} className="card mb-4 shadow-sm">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <h5>Order #{order.id}</h5>

                <span className={`badge ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>

              </div>

              <p className="mb-1">
                <strong>User:</strong> {order.username}
              </p>

              {order.orderDate && (

                <p className="text-muted">
                  Date: {new Date(order.orderDate).toLocaleString()}
                </p>

              )}

              <hr />

              <h6>Items</h6>

              <ul className="list-group mb-3">

                {order.items?.map(item => (

                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between"
                  >

                    <span>
                      {item.sweetName} × {item.quantity}
                    </span>

                    <span>
                      ₹{Number(item.price).toLocaleString()}
                    </span>

                  </li>

                ))}

              </ul>

              <div className="d-flex justify-content-between align-items-center">

                <h5>
                  Total: ₹{Number(order.totalAmount).toLocaleString()}
                </h5>

                {/* Status Update */}

                <select
                  className="form-select w-auto"
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                >

                  <option value="PLACED">PLACED</option>
                  <option value="PREPARING">PREPARING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>

                </select>

              </div>

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default AdminOrders;