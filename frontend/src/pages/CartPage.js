import React, { useEffect, useState, useMemo } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => total + item.price, 0).toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
        });
    }, [cart]);

    const removeCartItem = (pid) => {
        const updatedCart = cart.filter(item => item._id !== pid);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const getClientToken = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/braintree/token");
            setClientToken(data.clientToken);
        } catch (error) {
            console.error("Error fetching client token:", error);
        }
    };

    useEffect(() => {
        if (auth?.token) {
            getClientToken();
        }
    }, [auth?.token]);

    const handlePayment = async () => {
        if (!instance) {
            toast.error("Payment instance not available");
            return;
        }

        setLoading(true);
        try {
            const { nonce } = await instance.requestPaymentMethod();
            await axios.post("/api/v1/product/braintree/payment", { nonce, cart });
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully");
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const payWithSSL = async () => {
        try {
            const { data } = await axios.post("/api/v1/payment/ssl", { cart });
            window.location.replace(data.url);
        } catch (error) {
            console.error("SSL payment error:", error);
            toast.error("SSL payment failed. Please try again.");
        }
    };

    const renderCartItems = () => {
        if (cart.length === 0) {
            return (
                <div className="bg-gradient-to-br from-white to-blue-100 rounded-lg shadow-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                        <svg className="w-16 h-16 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21h6M9 21a2 2 0 01-2-2M15 21a2 2 0 002-2M9 21H7a2 2 0 01-2-2M15 21h2a2 2 0 002-2"></path>
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                        <p className="text-gray-600 mb-4">Please add some products to your cart</p>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                            onClick={() => navigate("/")}
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <div className="space-y-4">
                {cart.map((p) => (
                    <div key={p._id} className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-lg p-6 flex mb-4">
                        <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            className="w-32 h-32 object-cover rounded-lg mr-6"
                        />
                        <div className="flex-grow">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{p.name}</h3>
                            <p className="text-gray-600 mb-4">{p.description.substring(0, 50)}...</p>
                            <p className="text-xl font-bold mb-4 text-gray-800">Tk {p.price}</p>
                            <button
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                onClick={() => removeCartItem(p._id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    };

    const renderAddressSection = () => {
        if (!auth.user) return null;

        return (
            <div className="mb-6">
                <h4 className="font-semibold mb-2 text-gray-800">Current Address</h4>
                <p className="text-gray-700 mb-2">{auth.user.address}</p>
                <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                    onClick={() => navigate("/dashboard/user/profile")}
                >
                    Update Address
                </button>
            </div>
        );
    };

    const renderPaymentSection = () => {
        if (!auth.user) {
            return (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => navigate("/login", { state: "/cart" })}
                >
                    Please Login to Checkout
                </button>
            );
        }

        return (
            <div className="space-y-4">
                <button
                    className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded hover:from-green-500 hover:to-green-700 transition duration-300"
                    onClick={payWithSSL}
                >
                    Pay With SSLCommerzPayment
                </button>

                {clientToken && cart.length > 0 && (
                    <>
                        <DropIn
                            options={{ authorization: clientToken }}
                            onInstance={(instance) => setInstance(instance)}
                        />
                        <button
                            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded hover:from-blue-500 hover:to-blue-700 transition duration-300"
                            onClick={handlePayment}
                            disabled={loading || !instance || !auth?.user?.address}
                        >
                            {loading ? "Processing..." : "Confirm Card Payment"}
                        </button>
                    </>
                )}
            </div>
        );
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
                        {auth.user ? `Welcome ${auth.user.name} to your cart` : 'Welcome to your cart'}
                    </h1>
                    <h4 className="text-xl text-center text-gray-700">
                        {cart.length > 0
                            ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`
                            : 'Your cart is empty'}
                        {!auth.user && cart.length > 0 && ' - please login to checkout'}
                    </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-1">
                        {renderCartItems()}
                    </div>
                    <div className="col-span-1">
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 text-center rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart Summary</h2>
                            <p className="text-gray-700 mb-2">Total | Checkout | Payment</p>
                            <hr className="my-4 border-gray-300" />
                            <h4 className="text-xl font-bold mb-4 text-gray-800">Total: {totalPrice}</h4>
                            {renderAddressSection()}
                            {renderPaymentSection()}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;