import React from 'react';
import ProductCreate from './ProductCreate';
import ProductList from './ProductList';

function App() {
    return (
        <div className="App">
            <h1>Product Management</h1>
            <ProductCreate />
            <ProductList />
        </div>
    );
}

export default App;
