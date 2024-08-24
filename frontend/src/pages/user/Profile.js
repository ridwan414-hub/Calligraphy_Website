import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaCheck, FaTimes } from "react-icons/fa";

const InputField = ({ type, value, onChange, placeholder, label, icon, disabled = false, error }) => (
    <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
            {label}
        </label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                {icon}
            </span>
            <input
                type={type}
                id={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border ${disabled ? 'bg-gray-100' : 'bg-white'
                    } ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
        {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
);

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
    });
    const [loading, setLoading] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        const { name, email, phone, address } = auth?.user || {};
        setFormData((prev) => ({ ...prev, name, email, phone, address }));
    }, [auth?.user]);

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword);
    }, [formData.password, formData.confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password && !passwordMatch) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const { confirmPassword, ...dataToSend } = formData;
            const { data } = await axios.put("/api/v1/auth/profile", dataToSend);
            if (data?.error) {
                toast.error(data.error);
            } else {
                setAuth({ ...auth, user: data.updatedUser });
                localStorage.setItem("auth", JSON.stringify({ ...auth, user: data.updatedUser }));
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field) => (value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Layout title="Your Profile">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                        <UserMenu />
                    </div>
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">User Profile</h2>
                            <form onSubmit={handleSubmit}>
                                <InputField
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange("name")}
                                    placeholder="Enter Your Name"
                                    label="Name"
                                    icon={<FaUser />}
                                />
                                <InputField
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange("email")}
                                    placeholder="Enter Your Email"
                                    label="Email"
                                    icon={<FaEnvelope />}
                                    disabled
                                />
                                <InputField
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange("password")}
                                    placeholder="Enter New Password"
                                    label="Password"
                                    icon={<FaLock />}
                                />
                                <InputField
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange("confirmPassword")}
                                    placeholder="Confirm New Password"
                                    label="Confirm Password"
                                    icon={<FaLock />}
                                    error={!passwordMatch && formData.confirmPassword ? "Passwords do not match" : ""}
                                />
                                {formData.password && formData.confirmPassword && (
                                    <div className="mb-4 flex items-center">
                                        {passwordMatch ? (
                                            <FaCheck className="text-green-500 mr-2" />
                                        ) : (
                                            <FaTimes className="text-red-500 mr-2" />
                                        )}
                                        <span className={passwordMatch ? "text-green-500" : "text-red-500"}>
                                            {passwordMatch ? "Passwords match" : "Passwords do not match"}
                                        </span>
                                    </div>
                                )}
                                <InputField
                                    type="text"
                                    value={formData.phone}
                                    onChange={handleChange("phone")}
                                    placeholder="Enter Your Phone"
                                    label="Phone"
                                    icon={<FaPhone />}
                                />
                                <InputField
                                    type="text"
                                    value={formData.address}
                                    onChange={handleChange("address")}
                                    placeholder="Enter Your Address"
                                    label="Address"
                                    icon={<FaMapMarkerAlt />}
                                />
                                <button
                                    type="submit"
                                    className={`w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center ${loading || (formData.password && !passwordMatch) ? 'opacity-75 cursor-not-allowed' : ''
                                        }`}
                                    disabled={loading || (formData.password && !passwordMatch)}
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {loading ? 'Updating...' : 'Update Profile'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;