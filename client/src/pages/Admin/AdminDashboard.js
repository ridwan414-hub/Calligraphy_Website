import React from 'react';
import AdminMenu from '../../components/Layouts/AdminMenu';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Layouts/Header';

const AdminDashboard = () => {
    const [auth] = useAuth()
    return (
       <> <Header/>
        <div className='flex'>
            <AdminMenu />
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Admin Dashboard</h1>
                <h3>Admin Name:{auth?.user?.name}</h3>
                <h3>Admin Email:{auth?.user?.email}</h3>
                <h3>Admin Phone:{auth?.user?.phone}</h3>
                <Outlet />
            </div>
            </div>
        </>
    );
};

export default AdminDashboard;