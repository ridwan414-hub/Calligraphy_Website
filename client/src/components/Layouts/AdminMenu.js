import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold">Admin Panel</h3>
                    <NavLink to="/dashboard/admin/create-category" className="py-2 px-4 text-blue-500 hover:text-blue-700">Manage Categories</NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="py-2 px-4 text-blue-500 hover:text-blue-700">Create Product</NavLink>
                    <NavLink to="/dashboard/admin/products" className="py-2 px-4 text-blue-500 hover:text-blue-700">All Products</NavLink>
                    <NavLink to="/dashboard/admin/orders" className="py-2 px-4 text-blue-500 hover:text-blue-700">All Orders</NavLink>
                    <NavLink to="/dashboard/admin/users" className="py-2 px-4 text-blue-500 hover:text-blue-700">All Users</NavLink>
                </div>
            </div>
        </>
    );
};

export default AdminMenu;
