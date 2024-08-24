import React, { useEffect, useState } from 'react';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, Card, Button, Skeleton } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, InboxOutlined, TagsOutlined, CarOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const { Meta } = Card;

const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useCart();

    useEffect(() => {
        if (params?.slug) getProduct();
        // eslint-disable-next-line
    }, [params?.slug]);

    const getProduct = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProducts(data?.product?._id, data?.product?.category?._id);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/similar-products/${pid}/${cid}`);
            setSimilarProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToCart = () => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success('Item added to cart');
    };

    return (
        <Layout title='Product Details'>
            <div className='container mx-auto px-6 py-8 bg-gray-100'>
                <Spin
                    spinning={loading}
                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                >
                    {product ? (

                        // Inside your component's return statement:
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='flex justify-center items-center'>
                                <img
                                    src={`/api/v1/product/product-photo/${product._id}`}
                                    className="w-full h-auto max-w-lg rounded-lg shadow-lg border border-gray-300 bg-white transition-transform transform hover:scale-105"
                                    alt={product.name}
                                />
                            </div>
                            <div className='flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg border border-gray-300'>
                                <h1 className='text-4xl font-bold mb-4 flex items-center'>
                                    <TagsOutlined className='text-blue-500 mr-2' />
                                    {product.name}
                                </h1>
                                <p className='text-lg mb-4 flex items-center'>
                                    <InboxOutlined className='text-gray-500 mr-2' />
                                    {product.description}
                                </p>
                                <p className='text-2xl font-semibold mb-4 text-gray-700 flex items-center'>
                                    <DollarOutlined className='text-green-500 mr-2' />
                                    ${product.price}
                                </p>
                                <p className='text-lg mb-4 text-gray-600 flex items-center'>
                                    <InboxOutlined className='text-yellow-500 mr-2' />
                                    Quantity: {product.quantity}
                                </p>
                                <p className='text-lg mb-4 text-gray-600 flex items-center'>
                                    <TagsOutlined className='text-orange-500 mr-2' />
                                    Category: {product.category?.name}
                                </p>
                                <p className='text-lg mb-4 text-gray-600 flex items-center'>
                                    <CarOutlined className='text-red-500 mr-2' />
                                    Shipping: {product.shipping ? 'Yes' : 'No'}
                                </p>
                                <Button
                                    type="primary"
                                    className='mt-4 w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white transition-colors'
                                    icon={<ShoppingCartOutlined />}
                                    onClick={handleAddToCart} // Ensure this function is defined
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>

                    ) : (
                        <Skeleton active paragraph={{ rows: 6 }} />
                    )}

                    <hr className='my-8 border-gray-300' />
                    {/* <SimilarProductsSection similarProducts={similarProducts} navigate={navigate} /> */}

                    <div>
                        <h2 className='text-3xl font-bold mb-6'>Similar Products</h2>
                        {similarProducts.length === 0 ? (
                            <p className='text-center text-gray-600'>No similar products found</p>
                        ) : (
                            <div className='flex flex-wrap gap-6'>
                                {similarProducts.map((p) => (
                                    <Card
                                        key={p._id}
                                        hoverable
                                        cover={<img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className='object-cover h-40 w-full rounded-t-lg' />}
                                        className='transition-transform duration-300 transform hover:scale-105 border border-gray-300 shadow-lg bg-white'
                                    >
                                        <Meta
                                            title={p.name}
                                            description={`$${p.price}`}
                                            className='text-center'
                                        />
                                        <div className='mt-4 flex justify-between'>
                                            <Button type="primary" onClick={() => navigate(`/product/${p.slug}`)}>More Details</Button>
                                            <Button type="default">Add to Cart</Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </Spin>
            </div>
        </Layout>
    );
};

export default ProductDetails;
