import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://django-deployment-vercel.vercel.app/api/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Product List</h2>
            <div style={styles.productGrid}>
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        style={styles.productCard}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 style={styles.productTitle}>{product.title}</h3>
                        <img src={`${product.image}`} alt={product.title} style={styles.productImage} />
                        <p style={styles.productDescription}>{product.description}</p>
                        <p style={styles.productPrice}>Original Price: ${product.original_price}</p>
                        <p style={styles.productPrice}>Offer Price: ${product.offer_price}</p>
                        <p style={styles.warranty}>Warranty: {product.warranty_offer_title}</p>
                        <div style={styles.sellerInfo}>
                            <h4 style={styles.sellerName}>Seller: {product.seller.name}</h4>
                            <img src={`${product.seller.logo}`} alt={product.seller.name} style={styles.sellerLogo} />
                            <p style={styles.sellerRating}>Rating: {product.seller.rating}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
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

export default ProductList;
