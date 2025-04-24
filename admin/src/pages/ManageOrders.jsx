import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBoxOpen, FaUser, FaMoneyBill } from 'react-icons/fa';
import Admindashboard from '../components/Admindashboard'; // Adjust the import path

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/');
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchAllOrders();
  }, []);

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    setLoading(true);

    try {
      const res = await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: newStatus,
      });

      // Update the orders list with the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: res.data.order.status } : order
        )
      );

      setLoading(false);
      alert('Order status updated successfully!');
    } catch (err) {
      console.error('Failed to update order status:', err);
      setLoading(false);
      alert('Failed to update order status');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Admindashboard />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-800 to-green-400 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold">Manage Orders</h2>
          <p className="mt-2 text-sm">Manage all orders placed by users.</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                    <FaBoxOpen /> Order ID: {order._id}
                  </h3>
                  <span className="text-sm text-gray-500">
                    Status: <span className="font-semibold text-blue-600">{order.status}</span>
                  </span>
                </div>

                <div className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <FaUser className="text-green-500" />
                  <span>User ID: {order.userId}</span>
                </div>

                <div className="mb-2 text-gray-700">
                  <strong>Billing:</strong> {order.billingDetails.fullName}, {order.billingDetails.address}, {order.billingDetails.city}, {order.billingDetails.postalCode}
                </div>

                <div className="mb-2 text-gray-700 flex items-center gap-2">
                  <FaMoneyBill className="text-green-500" />
                  <strong>Total:</strong> Rs. {order.totalAmount}
                </div>

                <div className="mt-2">
                  <strong>Items:</strong>
                  <ul className="list-disc ml-6 mt-1 text-sm">
                    {order.orderItems.map((item, idx) => (
                      <li key={idx}>
                        {item.title} x {item.quantity} – Rs. {item.price}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status Update */}
                <div className="mt-4">
                  <label htmlFor="status" className="text-sm font-medium text-gray-700">
                    Update Order Status:
                  </label>
                  <select
                    id="status"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageOrders;
