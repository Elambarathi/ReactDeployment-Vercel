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
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
    },
    formContainer: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px',
    },
    heading: {
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
    },
    textarea: {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        height: '100px',
        resize: 'none',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    successMessage: {
        marginTop: '20px',
        color: 'green',
        textAlign: 'center',
    },
    subheading: {
        margin: '20px 0',
        color: '#555',
    }
};

export default ProductAddPage;
