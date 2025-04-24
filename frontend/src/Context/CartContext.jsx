import React, { createContext, useState, useContext } from 'react';

// Create the context
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        console.log(`Increased quantity for: ${product.title}`);
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      console.log(`Added to cart: ${product.title}`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const removedItem = cart.find(item => item._id === productId);
    if (removedItem) {
      console.log(`Removed from cart: ${removedItem.title}`);
    }
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      console.log(`Quantity is 0 or less. Removing item with ID: ${productId}`);
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map(item =>
          item._id === productId
            ? (console.log(`Updated quantity for ${item.title} to ${quantity}`), { ...item, quantity })
            : item
        )
      );
    }
  };

  // Clear the cart
  const clearCart = () => {
    console.log('Cart cleared.');
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
