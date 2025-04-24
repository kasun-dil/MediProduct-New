import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/Authcontext';
import {
  FaUserCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaUserTag,
  FaSignOutAlt,
  FaBox,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user._id) {
          const res = await axios.get(`http://localhost:5000/api/orders/${user._id}`);
          setOrders(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">You need to log in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left Panel - User Details */}
        <div className="bg-white rounded-2xl shadow-md p-6 col-span-1">
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle className="text-green-500" size={100} />
            <h2 className="text-xl font-bold text-gray-800 mt-4">
              {user.firstName} {user.lastName}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-green-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaPhoneAlt className="text-green-500" />
              <span>{user.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaUserTag className="text-green-500" />
              <span>User Type: {user.userType}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Right Panel - Order History */}
        <div className="col-span-1 lg:col-span-2">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaBox className="text-green-600" /> Order History
          </h3>

          {orders.length === 0 ? (
            <p className="text-gray-600">No orders placed yet.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>Order ID: <span className="text-gray-800">{order._id}</span></span>
                    <span>
                      Status:{' '}
                      <span className="font-semibold text-green-600">{order.status}</span>
                    </span>
                  </div>

                  <div className="text-gray-700 mb-2">
                    <strong>Billing:</strong> {order.billingDetails.fullName},{' '}
                    {order.billingDetails.address}, {order.billingDetails.city},{' '}
                    {order.billingDetails.postalCode}
                  </div>

                  <div className="text-gray-700 mb-2">
                    <strong>Payment:</strong> {order.billingDetails.paymentMethod}
                  </div>

                  <div className="text-gray-700 mb-2">
                    <strong>Total:</strong> Rs. {order.totalAmount}
                  </div>

                  <div>
                    <strong>Items:</strong>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                      {order.orderItems.map((item, idx) => (
                        <li key={idx}>
                          {item.title} x {item.quantity} - Rs. {item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
