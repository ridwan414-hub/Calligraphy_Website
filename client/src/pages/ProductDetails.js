import React, { useEffect, useState } from 'react';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])

    //get product slug from url
    useEffect(() => {
        if (params?.slug) getProduct()
        // eslint-disable-next-line
    }, [params?.slug])
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProducts(data?.product?._id, data?.product?.category?._id)

        } catch (error) {
            console.log(error)
        }
    }
    //get similar products
    const getSimilarProducts = async (pid,cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/similar-products/${pid}/${cid}`)
            setSimilarProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout title='Product Details'>
            <div className='grid grid-cols-2 container mt-2' >
                <div className='col-span-1'>
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name}
                        height={'300px'}
                        width={'350px'}
                    />
                </div>
                <div className='col-span-1'>
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name :{product.name}</h6>
                    <h6>Description :{product.description}</h6>
                    <h6>Price :{product.price}</h6>
                    <h6>Quantity :{product.quantity}</h6>
                    <h6>Category :{product.category?.name}</h6>
                    <h6>Shipping :{product.shipping}</h6>
                    <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
            </div>
            <hr/>
            <div className='grid grid-cols-1 container'>
                <div className='col-span-1'>
                    <h6>Similar Products</h6>
                    {similarProducts.length === 0 && <p className='text-center'>No similar products found</p>}
                    <div className='flex flex-wrap'>
                        {similarProducts?.map((p) => (

                            <div key={p._id} className="card m-2" style={{ width: '18rem' }}>
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0.32)}...</p>
                                    <p className="card-text"> $ {p.price}</p>
                                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className="btn btn-secondary ms-1">Add to Cart</button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;