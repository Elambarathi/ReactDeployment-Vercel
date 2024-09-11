import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';

function ProductCreate() {
    const { register, handleSubmit, reset } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        // Create a FormData object to send the file and other data
        const formData = new FormData();
        formData.append('name', data.name); // Product name
        formData.append('description', data.description); // Product description
        formData.append('actual_price', data.actual_price); // Original price
        formData.append('offer_price', data.offer_price); // Offer price
        formData.append('product_image', data.product_image[0]); // Product image
        formData.append('warranty_period', data.warranty_period); // Warranty period

        // Seller details (nested)
        formData.append('seller.name', data.seller_name); // Seller name
        formData.append('seller.photo', data.seller_photo[0]); // Seller photo
        formData.append('seller.rating', data.seller_rating); // Seller rating

        try {
            // Sending POST request to the backend with form data
            const response = await axios.post('https://test-five-khaki-30.vercel.app/api/products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Product created successfully!');
            reset(); // Reset the form after successful submission
        } catch (error) {
            console.error('There was an error creating the product!', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={styles.formContainer}
            >
                <h2 style={styles.heading}>Create a New Product</h2>
                <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                    {/* Product fields */}
                    <input {...register('name')} placeholder="Product Name" required style={styles.input} />
                    <input {...register('product_image')} type="file" required style={styles.input} />
                    <textarea {...register('description')} placeholder="Description" required style={styles.textarea} />
                    <input {...register('actual_price')} type="number" placeholder="Original Price" required style={styles.input} />
                    <input {...register('offer_price')} type="number" placeholder="Offer Price" required style={styles.input} />
                    <input {...register('warranty_period')} placeholder="Warranty Period" style={styles.input} />
                    
                    {/* Seller fields */}
                    <h3 style={styles.subheading}>Seller Details:</h3>
                    <input {...register('seller_name')} placeholder="Seller Name" required style={styles.input} />
                    <input {...register('seller_photo')} type="file" required style={styles.input} />
                    <input {...register('seller_rating')} type="number" step="0.1" placeholder="Seller Rating" required style={styles.input} />
                    
                    {/* Submit button */}
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                </form>
                {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
            </motion.div>
        </div>
    );
}

// Define some basic styles
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

export default ProductCreate;
