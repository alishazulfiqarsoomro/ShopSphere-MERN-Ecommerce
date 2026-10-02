
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage safely
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopsphere-cart");

      if (!savedCart) return [];

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Cart localStorage error:", error);
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(
      "shopsphere-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // ========================================
  // ADD TO CART
  // ========================================

  const addToCart = (product) => {
    if (!product?._id) return;

    // Don't add out-of-stock products
    if (Number(product.stock) <= 0) {
      return;
    }

    setCartItems((currentItems) => {
      const existingProduct = currentItems.find(
        (item) => item._id === product._id
      );

      // Product already exists
      if (existingProduct) {
        // Don't exceed available stock
        if (
          existingProduct.quantity >= Number(product.stock)
        ) {
          return currentItems;
        }

        return currentItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                stock: product.stock,
              }
            : item
        );
      }

      // New product
      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // ========================================
  // REMOVE FROM CART
  // ========================================

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item._id !== productId
      )
    );
  };

  // ========================================
  // INCREASE QUANTITY
  // ========================================

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item._id !== productId) {
          return item;
        }

        // Don't exceed product stock
        if (item.quantity >= Number(item.stock)) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  // ========================================
  // DECREASE QUANTITY
  // ========================================

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ========================================
  // CLEAR CART
  // ========================================

  const clearCart = () => {
    setCartItems([]);
  };

  // ========================================
  // CART COUNT
  // ========================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // ========================================
  // CART TOTAL
  // ========================================

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ========================================
// USE CART HOOK
// ========================================

export function useCart() {
  return useContext(CartContext);
}
