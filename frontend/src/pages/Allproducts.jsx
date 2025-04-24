import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/Authcontext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const productTypes = ['All', 'Children toys', 'Relaxing Items', 'Stress release Item', 'Books', 'Others'];

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedType === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.type === selectedType));
    }
  }, [selectedType, products]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow mx-auto p-3 w-full max-w-screen-2xl">
        {loading ? (
          <div className="text-center text-green-700 font-semibold mt-12">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Left Sidebar - Tabs */}
            <div className="md:col-span-1">
              <div className="bg-white shadow rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Product Types</h2>
                <ul className="space-y-3">
                  {productTypes.map((type) => (
                    <li key={type}>
                      <button
                        onClick={() => setSelectedType(type)}
                        className={`w-full text-left px-4 py-2 rounded-md transition ${
                          selectedType === type
                            ? 'bg-green-600 text-white font-semibold'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Content - Products */}
            <div className="md:col-span-4">
              {filteredProducts.length === 0 ? (
                <div className="text-red-500">No products found for selected category.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex flex-col justify-between p-5 flex-1">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.title}</h3>
                          <span className="inline-block text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 mb-3">
                            {product.type}
                          </span>
                          <p className="text-xl font-bold text-green-600">${product.price}</p>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                          <button
                            onClick={() => {
                              if (!user) {
                                alert('Please log in to add items to your cart.');
                                return;
                              }
                              addToCart(product);
                            }}
                            disabled={!user}
                            className={`px-4 py-2 rounded-full transition duration-300 font-medium ${
                              user
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                          >
                            {user ? 'Add to Cart' : 'Login to Add'}
                          </button>
                          <button
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition font-medium"
                          >
                            View Product
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Allproducts;
