import React, { useEffect, useState } from 'react';
import UserMenu from '../../components/Layouts/UserMenu';
import Layout from '../../components/Layouts/Layout';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { FaSpinner } from 'react-icons/fa';

const OrderItem = ({ product }) => (
    <div className="flex items-center border-b border-gray-200 py-4 hover:bg-gray-50 transition duration-150 ease-in-out" key={product._id}>
        <img src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} className="w-24 h-24 object-cover rounded-md mr-4 shadow-sm" />
        <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description.substring(0, 50)}...</p>
            <p className="text-sm font-medium mt-1 text-green-600">Price: ${product.price.toFixed(2)}</p>
        </div>
    </div>
);

const OrderCard = ({ order, index }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-lg">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-white">
            <h2 className="text-lg font-semibold">Order #{index + 1}</h2>
        </div>
        <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span></p>
                    <p><strong>Buyer:</strong> {order.buyer?.name}</p>
                    <p><strong>Date:</strong> {moment(order.createAt).format('MMMM D, YYYY')}</p>
                </div>
                <div>
                    <p><strong>Payment:</strong> <span className={`px-2 py-1 rounded-full text-xs ${order.payment.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{order.payment.success ? "Success" : "Failed"}</span></p>
                    <p><strong>Quantity:</strong> {order.products?.length}</p>
                </div>
            </div>
            <h3 className="font-semibold mb-2 text-lg">Products:</h3>
            {order.products?.map((product) => (
                <OrderItem product={product} key={product._id} />
            ))}
        </div>
    </div>
);

const Orders = () => {
    const [auth] = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const { data } = await axios.get('/api/v1/auth/orders');
                setOrders(data);
            } catch (error) {
                console.error(`Error fetching orders: ${error}`);
            } finally {
                setLoading(false);
            }
        };
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <Layout title="Your Orders">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                        <UserMenu />
                    </div>
                    <div className="md:w-3/4">
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h1>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <FaSpinner className="animate-spin text-4xl text-blue-500" />
                            </div>
                        ) : orders.length === 0 ? (
                            <p className="text-gray-600 text-center py-8 bg-gray-100 rounded-lg">No orders found.</p>
                        ) : (
                            orders.map((order, index) => (
                                <OrderCard order={order} index={index} key={order._id} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;