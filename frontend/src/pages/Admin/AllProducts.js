import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-products');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Failed to load all products')
        }
    };
    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div className='flex'>
            <div className=''>
                <h1 className='text-center'>All Products List</h1>
                <div className='flex flex-wrap'>
                    {products?.map((p) => (
                        <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className='product-link' >

                            <div className="card m-2" style={{ width: '18rem' }}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;