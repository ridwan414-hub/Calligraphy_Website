import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import "../../styles/AuthStyle.css";
import Layout from "../../components/Layouts/Layout";
import Loader from "../../components/Loader";

const ForgotPasssword = () => {
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState(false);
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("/api/v1/auth/forgot-password", {
                email,
                answer,
            });
            setLoading(false);
            if (res && res.data.success) {
                setOk(true);
                toast.success(res.data && res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title={"Forgot Password - Ecommerce APP"}>
            {loading ? <Loader message={'Email is on the way'} /> :
                <>
                    {ok && <div className="bg-green-200 text-green-800 p-2">Check your email. <span>{email}</span>Reset Password link has been sent </div>}
                    <div className="flex flex-col items-center">
                        <form onSubmit={handleSubmit} className="w-96">
                            <h4 className="text-2xl font-bold mb-4">FORGOT PASSWORD</h4>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter Your Email "
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter Your favorite food "
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-4">
                                SEND MAIL FOR RESET PASSWORD
                            </button>
                        </form>
                    </div>
                </>}
        </Layout>
    );
};

export default ForgotPasssword;