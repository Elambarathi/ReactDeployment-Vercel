import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
function ProductAddPage() {
  const [product, setProduct] = useState({
    name: '',
    photo: null,
    actualPrice: '',
    offerPrice: '',
    description: '',
    sellerName: '',
    sellerPhoto: null,
    sellerRating: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach((key) => formData.append(key, product[key]));
    await axios.post('https://test-five-khaki-30.vercel.app/api/products/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" />
        <input type="file" name="photo" onChange={handleChange} />
        <input type="text" name="actualPrice" value={product.actualPrice} onChange={handleChange} placeholder="Actual Price" />
        <input type="text" name="offerPrice" value={product.offerPrice} onChange={handleChange} placeholder="Offer Price" />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="sellerName" value={product.sellerName} onChange={handleChange} placeholder="Seller Name" />
        <input type="file" name="sellerPhoto" onChange={handleChange} />
        <input type="number" name="sellerRating" value={product.sellerRating} onChange={handleChange} placeholder="Seller Rating" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductAddPage;
