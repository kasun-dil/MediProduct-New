import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/Authcontext';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo2.png';

const Navbar = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left: Logo & Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
            <span className="text-green-600 text-xl font-bold">Mediproduct</span>
          </Link>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-green-600 text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>

          {/* Desktop Nav + Right Side */}
          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            {/* Center: Nav Links */}
            <ul className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 text-gray-700 font-medium">
            <li><Link to="/" className="hover:text-green-600">Home</Link></li>
              <li><Link to="/AboutUs" className="hover:text-green-600">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-green-600">Contact</Link></li>
              <li><Link to="/products" className="hover:text-green-600">products</Link></li>

              <li>
                  <a href="https://medportal-project.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                  MedPortal</a>
              </li>
            </ul>

            {/* Right: Profile & Cart */}
            <div className="flex items-center space-x-4">
              {user ? (
                <Link to="/profile" className="flex items-center space-x-2">
                  <FaUserCircle className="text-green-600 w-6 h-6" />
                  <span className="text-gray-700 font-medium">{user.firstName}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="border border-green-600 text-green-600 px-4 py-1 rounded hover:bg-green-600 hover:text-white transition"
                >
                  Login
                </Link>
              )}

              <Link to="/cart" className="relative">
                <ShoppingCart className="text-green-600 w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1.5">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <ul className="space-y-3 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-green-600">Home</Link></li>
            <li><Link to="/AboutUs" onClick={() => setMenuOpen(false)} className="block hover:text-green-600">About Us</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-green-600">Contact</Link></li>
            <li><Link to="/medportal" onClick={() => setMenuOpen(false)} className="block hover:text-green-600">MedPortal</Link></li>

            {/* Profile/Login + Cart in Mobile */}
            <div className="pt-4 space-y-2">
              {user ? (
                <Link to="/profile" className="flex items-center space-x-2" onClick={() => setMenuOpen(false)}>
                  <FaUserCircle className="text-green-600 w-5 h-5" />
                  <span className="text-gray-700">{user.firstName}</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="border border-green-600 text-green-600 px-4 py-1 rounded block text-center hover:bg-green-600 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              <Link to="/cart" className="relative flex items-center" onClick={() => setMenuOpen(false)}>
                <ShoppingCart className="text-green-600 w-5 h-5" />
                {totalItems > 0 && (
                  <span className="ml-1 bg-green-600 text-white text-xs rounded-full px-1.5">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
