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

// Define some basic styles
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f7f9fc',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    productCard: {
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
    },
    productTitle: {
        marginBottom: '10px',
        color: '#007bff',
    },
    productImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    productDescription: {
        color: '#555',
        marginBottom: '10px',
    },
    productPrice: {
        color: '#333',
        marginBottom: '5px',
    },
    warranty: {
        color: '#666',
        marginBottom: '10px',
    },
    sellerInfo: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
    },
    sellerName: {
        marginRight: '10px',
        color: '#007bff',
    },
    sellerLogo: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: '10px',
    },
    sellerRating: {
        color: '#555',
    },
};

export default ProductListPage;
