import { createContext, useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  /* =========================
     Load Cart from Storage
  ========================= */

  const [cartItems, setCartItems] = useState(() => {

    try {

      const saved = localStorage.getItem("cart");

      return saved ? JSON.parse(saved) : [];

    } catch {

      return [];

    }

  });


  /* =========================
     Save Cart to Storage
  ========================= */

  useEffect(() => {

    try {

      localStorage.setItem("cart", JSON.stringify(cartItems));

    } catch (error) {

      console.error("Failed to save cart", error);

    }

  }, [cartItems]);


  /* =========================
     Add Item to Cart
  ========================= */

  const addToCart = (sweet) => {

    setCartItems(prev => {

      const existing = prev.find(item => item.id === sweet.id);

      if (existing) {

        if (existing.quantity >= sweet.quantity) {

          toast.warning("⚠️ Maximum stock reached");
          return prev;

        }

        toast.success(`🛒 ${sweet.name} added`);

        return prev.map(item =>
          item.id === sweet.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

      }

      toast.success(`🛒 ${sweet.name} added`);

      return [...prev, { ...sweet, quantity: 1 }];

    });

  };


  /* =========================
     Remove Item
  ========================= */

  const removeFromCart = (id) => {

    toast.info("Item removed from cart");

    setCartItems(prev =>
      prev.filter(item => item.id !== id)
    );

  };


  /* =========================
     Increase Quantity
  ========================= */

  const increaseQty = (id) => {

    setCartItems(prev =>
      prev.map(item => {

        if (item.id === id) {

          if (item.quantity >= item.quantityAvailable) {

            toast.warning("⚠️ Maximum stock reached");
            return item;

          }

          return { ...item, quantity: item.quantity + 1 };

        }

        return item;

      })
    );

  };


  /* =========================
     Decrease Quantity
  ========================= */

  const decreaseQty = (id) => {

    setCartItems(prev => {

      const updated = prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);

      if (updated.length < prev.length) {
        toast.info("Item removed from cart");
      }

      return updated;

    });

  };


  /* =========================
     Clear Cart
  ========================= */

  const clearCart = () => {

    toast.info("🧹 Cart cleared");

    setCartItems([]);

  };


  /* =========================
     Cart Count
  ========================= */

  const cartCount = useMemo(() => {

    return cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

  }, [cartItems]);


  /* =========================
     Cart Total
  ========================= */

  const cartTotal = useMemo(() => {

    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

  }, [cartItems]);


  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartCount,
        cartTotal
      }}
    >

      {children}

    </CartContext.Provider>

  );

};