import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Mediproduct</h3>
            <p className="text-lg">Providing top quality Counselling products for healthier lives.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center">
            <a href="/about" className="text-white hover:text-blue-400">About Us</a>
            <a href="/products" className="text-white hover:text-blue-400">Products</a>
            <a href="/contact" className="text-white hover:text-blue-400">Contact</a>
            <a href="/privacy" className="text-white hover:text-blue-400">Privacy Policy</a>
            <a href="/terms" className="text-white hover:text-blue-400">Terms & Conditions</a>

          </div>

          
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">© Copyright 2025 MedPortal All Rights Reserved. <br></br>Designed by G70 Group Project - NSBM Green University students</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
