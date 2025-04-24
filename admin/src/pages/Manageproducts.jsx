import React, { useEffect, useState } from 'react';
import Admindashboard from '../components/Admindashboard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditProduct from '../components/Editproduct'; // Assuming this is the component for editing

const Manageproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [currentProduct, setCurrentProduct] = useState(null); // State for the product being edited

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true); // Open the modal when Edit is clicked
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Admindashboard />

      <main className="flex-1 p-8 overflow-y-auto bg-white rounded-lg shadow-lg">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-700 to-green-400 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-semibold">Manage Products</h2>
          <p className="mt-2 text-sm">Mange all products here</p>
        </div>

        {/* Add Product Button */}
        <div className="mb-6">
          <Link to="/addproduct">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Add Product
            </button>
          </Link>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-green-800 font-semibold">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-red-600">No products found.</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="px-6 py-4 text-left">Product</th>
                  <th className="px-6 py-4 text-left">Type</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Stock</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50 transition duration-300">
                    <td className="px-6 py-4 text-lg">{product.title}</td>
                    <td className="px-6 py-4">{product.type}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(product)} // Handle Edit Button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-xl   flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <EditProduct product={currentProduct} closeModal={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Manageproducts;
