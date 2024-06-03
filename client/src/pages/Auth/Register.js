import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyle.css";
import Layout from "../../components/Layouts/Layout";
import Loader from "../../components/Loader";
const Register = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [ok, setOk] = useState(false)
    // const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
                answer,
            });
            setLoading(false);
            if (res && res.data.success) {
                setOk(true)
                // navigate("/login");
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
        <Layout title="Register - Ecommer App">
            {loading ? <Loader message={'Email is on the way'} /> :
                <>
                    <div className="form-container ">
                        <form onSubmit={handleSubmit}>
                            {ok && <div className="alert alert-success">Check your email <span>{email}</span> .An activation link has been sent </div>}
                            <h4 className="title">REGISTER FORM</h4>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Your Name"
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Your Email "
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Your Password"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Your Phone"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Your Address"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="form-control"
                                    placeholder="What is your favourite food?"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                REGISTER
                            </button>
                        </form>
                    </div>
                </>}
        </Layout>
    );
};

export default Register;