import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProductModal = ({ product, isOpen, onClose, fetchProducts }) => {
  const [editedProduct, setEditedProduct] = useState({
    id: product._id,
    title: product.title,
    description: product.description,
    manufacturingPrice: product.manufacturingPrice,
    sellingPrice: product.sellingPrice,
    discountingPrice: product.discountingPrice,
    category: product.category,
    subCategory: product.subCategory,
    totalStock: product.totalStock,
    availableStock: product.availableStock,
    sku: product.sku,
    brand: product.brand,
  });

  useEffect(() => {
    setEditedProduct({
      id: product._id,
      title: product.title,
      description: product.description,
      manufacturingPrice: product.manufacturingPrice,
      sellingPrice: product.sellingPrice,
      discountingPrice: product.discountingPrice,
      category: product.category,
      subCategory: product.subCategory,
      totalStock: product.totalStock,
      availableStock: product.availableStock,
      sku: product.sku,
      brand: product.brand,
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/edit-product",
        editedProduct
      );
      console.log(response.data);
      fetchProducts();
    } catch (error) {
      console.error(error.response);
    }
    // onSave(editedProduct);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form>
          {Object.keys(editedProduct).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                name={key}
                value={editedProduct[key] || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
        </form>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
