import React, { useEffect, useState } from "react";
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
    const [instance, setInstance] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            // eslint-disable-next-line array-callback-return
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };
    //get payment token
    const getClientToken = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/braintree/token")
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getClientToken();
    }, [auth?.token]);
    //handle payment
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            await axios.post("/api/v1/product/braintree/payment", {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    //pay with ssl
    const payWithSSL = async () => {
        try {
            const { data } = await axios.post("/api/v1/payment/ssl", { cart })
            window.location.replace(data.url)

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className="container">
                <div className="grid grid-cols-1">
                    <div className="col-span-1">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
                                }`
                                : " Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        {cart?.map((p) => (
                            <div key={p._id} className="grid grid-cols-2 mb-2 p-3 card flex-row">
                                <div className="col-span-1">
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        width="100px"
                                        height={"100px"}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price : {p.price}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-span-1 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Plase Login to checkout
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="mt-2">
                            <div className="mt-2">
                                <button className="btn btn-primary" onClick={payWithSSL}>Pay With SSLCommerzPayment</button>
                            </div>
                            {!clientToken || !cart?.length ? (
                                ""
                            ) : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Confirm Card Payment"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;