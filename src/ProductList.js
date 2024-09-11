import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://test-five-khaki-30.vercel.app/api/products/');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.photo} alt={product.name} style={{ width: '100px' }} />
            <p>Actual Price: ${product.actualPrice}</p>
            <p>Offer Price: ${product.offerPrice}</p>
            <p>Description: {product.description}</p>
            <h3>Seller Details</h3>
            <p>Seller Name: {product.seller.name}</p>
            <img src={product.seller.photo} alt={product.seller.name} style={{ width: '50px' }} />
            <p>Seller Rating: {product.seller.rating} / 5</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductListPage;
