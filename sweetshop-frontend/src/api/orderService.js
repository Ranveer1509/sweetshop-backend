import API from "./api";

/* =====================================
   Place Order
===================================== */

export const placeOrder = async (cartItems) => {

  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const orderData = {
    items: cartItems.map(item => ({
      sweetId: item.id,
      quantity: item.quantity
    }))
  };

  try {

    const { data } = await API.post("/orders", orderData);

    return data;

  } catch (error) {

    console.error("Place order failed:", error);
    throw error;

  }

};


/* =====================================
   Get Logged-in User Orders
===================================== */

export const getMyOrders = async () => {

  try {

    const { data } = await API.get("/orders/my");

    return data || [];

  } catch (error) {

    console.error("Failed to fetch user orders:", error);
    return [];

  }

};


/* =====================================
   Get Order Invoice
===================================== */

export const getInvoice = async (orderId) => {

  try {

    const { data } = await API.get(`/orders/${orderId}/invoice`);

    return data;

  } catch (error) {

    console.error("Failed to fetch invoice:", error);
    throw error;

  }

};


/* =====================================
   Get Order By ID
===================================== */

export const getOrderById = async (orderId) => {

  try {

    const { data } = await API.get(`/orders/${orderId}`);

    return data;

  } catch (error) {

    console.error("Failed to fetch order:", error);
    throw error;

  }

};


/* =====================================
   Admin: Get All Orders
===================================== */

export const getAllOrders = async () => {

  try {

    const { data } = await API.get("/orders/admin");

    return data || [];

  } catch (error) {

    console.error("Failed to fetch admin orders:", error);
    return [];

  }

};


/* =====================================
   Admin: Update Order Status
===================================== */

export const updateOrderStatus = async (orderId, status) => {

  try {

    const { data } = await API.put(`/orders/${orderId}/status`, {
      status
    });

    return data;

  } catch (error) {

    console.error("Failed to update order status:", error);
    throw error;

  }

};


/* =====================================
   Cancel Order
===================================== */

export const cancelOrder = async (orderId) => {

  try {

    const { data } = await API.delete(`/orders/${orderId}`);

    return data;

  } catch (error) {

    console.error("Failed to cancel order:", error);
    throw error;

  }

};