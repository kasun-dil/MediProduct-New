import React, { useState } from 'react';
import axios from 'axios';

const EditProduct = ({ product, closeModal }) => {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    type: product.type,
    price: product.price,
    stock: product.stock,
    image: null, // Add a file input for the image
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    if (formData.image) formDataToSend.append('image', formData.image);

    try {
      const res = await axios.put(`http://localhost:5000/api/products/${product._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product updated successfully', res.data);
      closeModal(); // Close the modal after successful update
    } catch (err) {
      console.error('Error updating product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="title">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="type">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-green-600 text-white px-6 py-3 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
