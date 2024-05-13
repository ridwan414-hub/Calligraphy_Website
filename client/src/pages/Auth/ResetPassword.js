import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyle.css";
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
            <div className="form-container ">
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
            </div>
        </Layout>
    );
};

export default ResetPassword;