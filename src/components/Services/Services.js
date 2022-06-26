import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Services.css';

const Services = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    return (
        <div className='container products mt-5'>
            <h1 className='products-title mb-3'>Our Products</h1>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    );
};

export default Services;