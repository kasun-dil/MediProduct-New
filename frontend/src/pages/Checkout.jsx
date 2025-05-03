import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import { useCart } from '../Context/CartContext';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const totalAmount = location.state?.totalAmount || 0;
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cash',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      userId: user?._id,
      cart,
      billingDetails: formData,
      totalAmount,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/orders/create',
        orderData
      );
      console.log('Order placed successfully:', response.data);
      alert('Order placed successfully!');
      clearCart();
      navigate('/profile');
    } catch (error) {
      console.error('Failed to place the order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-50 to-green-200 flex items-center justify-center p-6">
      <div className="backdrop-blur-xl bg-white/70 border border-green-200 rounded-3xl shadow-2xl w-full max-w-3xl p-10 transition-all duration-300 hover:shadow-green-300">
        <h2 className="text-4xl font-bold text-green-700 text-center mb-10 tracking-wide">
          Checkout
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm font-semibold mb-2 block">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none bg-white/90"
                required
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm font-semibold mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none bg-white/90"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-gray-600 text-sm font-semibold mb-2 block">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none bg-white/90"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm font-semibold mb-2 block">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none bg-white/90"
                required
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm font-semibold mb-2 block">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none bg-white/90"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-gray-600 text-sm font-semibold mb-2 block">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none bg-white/90"
              required
            >
              <option value="cash">Cash on Delivery</option>
              <option value="card" disabled>Credit/Debit Card (Coming Soon)</option>
            </select>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-700">Total</span>
              <span className="text-xl font-bold text-green-700">${totalAmount.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-300"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
