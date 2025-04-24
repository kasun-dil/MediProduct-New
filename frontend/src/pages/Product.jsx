import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/Authcontext';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="text-center text-green-700 font-semibold mt-8">Loading product...</div>
      </>
    );
  }

  return (
    <>
      
      <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full max-h-110  object-cover transition-all duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col ">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full mb-3">
            {product.type}
          </span>

          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{product.title}</h2>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            {product.stock > 0 ? (
              <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full">
                In Stock: {product.stock}
              </span>
            ) : (
              <span className="text-sm text-white bg-red-500 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          <button
            disabled={!user || product.stock === 0}
            onClick={() => {
              if (!user) {
                alert('Please log in to add this item to your cart.');
                return;
              }
              addToCart(product);
            }}
            className={`w-full py-3 px-6 rounded-xl text-white font-semibold transition duration-300 text-lg 
              ${!user || product.stock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'}`}
          >
            {user
              ? product.stock > 0
                ? 'Add to Cart'
                : 'Out of Stock'
              : 'Login to Add to Cart'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
