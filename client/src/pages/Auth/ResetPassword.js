import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/Layouts/Layout";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const param = useParams()

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (confirmPassword === newPassword) {
                const res = await axios.put(`/api/v1/auth/reset-password/${param.token}`, {
                    newPassword,
                });
                console.log(res.data)
                if (res && res.data.success) {
                
                    toast.success(res.data && res.data.message);
                    navigate("/login");
                } else {
                    toast.error(res.data.message);
                }
            } else {
                toast.error("Password does not match");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"Forgot Password - Ecommerce APP"}>
            {/* <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">RESET PASSWORD</h4>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Confirm Your New Password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        RESET PASSWORD
                    </button>
                </form>
            </div> */}
            <div className="min-h-screen rounded-3xl my-10 bg-gradient-to-tr from-violet-200 from-10% via-indigo-300 via-30% to-90% flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-20 w-auto rounded-full"
                        src="https://img.freepik.com/premium-vector/art-gallery-logo-design_92167-616.jpg?w=740"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl leading-9 font-bold text-gray-900">
                        Reset your password
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit}>
                            <div className="mt-6">
                                <label htmlFor="new-password" className="block text-sm font-medium leading-5 text-gray-700">
                                    New Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input id="new-password" name="new-password" value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)} type="password" required placeholder="Enter Your New Password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="confirm-password" className="block text-sm font-medium leading-5 text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input id="confirm-password" name="confirm-password" value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} type="password" required placeholder="Confirm Your New Password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <span className="block w-full rounded-md shadow-sm">
                                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                        Reset Password
                                    </button>
                                </span>
                            </div>
                            <hr />
                            <div className="flex justify-between mt-2">
                                <div className="text-center">
                                    <Link to='/register' className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800" href="#">
                                        Regiser for an account
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link to='/login' className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800" href="./index.html">
                                        Already have an account? Login!
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ResetPassword;