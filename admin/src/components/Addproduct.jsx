import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 🧭 Import navigate

const AddProduct = () => {
  const navigate = useNavigate(); // 🧭 Initialize navigation
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    price: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const productTypes = [
    'Children toys',
    'Relaxing Items',
    'Stress release Item',
    'Books',
    'Others',
  ];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!image) {
      setMessage('Please upload an image.');
      setIsError(true);
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('type', formData.type);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:5000/api/products/add', data);
      setMessage('Product added successfully!');
      setIsError(false);

      // 🧭 Navigate to manage products page
      navigate('/admin/manageproducts');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add product.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="" disabled>Select Product Type</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock (optional)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />

        {preview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
            <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-md border" />
          </div>
        )}

        {message && (
          <div
            className={`p-3 rounded-md text-center text-sm ${
              isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md transition-all duration-200 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
