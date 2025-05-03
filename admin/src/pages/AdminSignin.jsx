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

      if (data.userType !== 'admin') {
        setMessage('Access denied: Admins only');
        setIsError(true);
        return;
      }

      login(data);
      setMessage('Login successful!');
      setIsError(false);
      navigate('/admin/manageproducts');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 px-6">
      
      {/* Floating background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Form Card */}
      <div className="relative z-10 max-w-md w-full bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-7 tracking-wide">
          Admin Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
            />
          </div>

          {message && (
            <div
              className={`p-3 text-sm rounded-lg text-center font-semibold ${
                isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 hover:scale-105 text-white font-bold transition-all duration-300 shadow-lg"
          >
            Sign In as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignin;
