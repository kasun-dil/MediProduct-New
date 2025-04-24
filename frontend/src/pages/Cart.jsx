import React from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleChangeQuantity = (productId, e) => {
    const quantity = e.target.value;
    updateQuantity(productId, parseInt(quantity, 10));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-6 md:p-12">
      <h2 className="text-3xl font-semibold mb-6 text-green-700 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty. Start shopping!</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div key={item._id} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover" />
                <div className="p-4 flex flex-col space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.type}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleChangeQuantity(item._id, e)}
                        className="w-16 p-2 border border-gray-300 rounded-md"
                      />
                      <span className="font-semibold text-green-600">${item.price}</span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
            <span className="text-2xl font-bold text-green-700">Total: ${totalAmount.toFixed(2)}</span>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button
                onClick={clearCart}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate('/checkout', { state: { cart, totalAmount } })}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
