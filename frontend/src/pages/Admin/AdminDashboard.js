// AdminDashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminMenu from '../../components/Layouts/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth] = useAuth();

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminMenu />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
                        <Link to="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Go to Home
                        </Link>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container mx-auto px-6 py-8">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
                            <p><strong>Name:</strong> {auth?.user?.name}</p>
                            <p><strong>Email:</strong> {auth?.user?.email}</p>
                            <p><strong>Phone:</strong> {auth?.user?.phone}</p>
                        </div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
