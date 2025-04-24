import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const AdminSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
      });

      // Ensure user is an admin
      if (data.userType !== 'admin') {
        setMessage('Access denied: Admins only');
        setIsError(true);
        return;
      }

      login(data); // Save user in context + localStorage
      setMessage('Login successful!');
      setIsError(false);

      // Navigate to admin dashboard (e.g., manage products)
      navigate('/admin/manageproducts');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">Admin Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {message && (
            <div
              className={`p-3 text-sm rounded-md text-center ${
                isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Sign In as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignin;
