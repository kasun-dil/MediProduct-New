import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext.jsx'; // adjust path as needed

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
      });

      login(data); // set context
      setMessage(data.message);
      setIsError(false);
      navigate('/'); // go to home
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email address"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {message && (
            <div
              className={`p-3 text-sm rounded-md text-center ${
                isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
