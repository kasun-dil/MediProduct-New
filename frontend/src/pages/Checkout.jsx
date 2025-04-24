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
        fullName: `${user.firstName || ''} ${user.lastName || ''}`,
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
      clearCart(); // 🧹 Clear cart after successful order
      navigate('/profile');
    } catch (error) {
      console.error('Failed to place the order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-green-700">Checkout</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg space-y-4"
      >
        <div>
          <label htmlFor="fullName" className="block font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="postalCode"
              className="block font-medium text-gray-700"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="paymentMethod"
            className="block font-medium text-gray-700"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="cash">Cash on Delivery</option>
            <option value="card" disabled>
              Credit/Debit Card
            </option>
          </select>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold text-lg text-green-700">
            Total: ${totalAmount.toFixed(2)}
          </h3>
          <button
            type="submit"
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
