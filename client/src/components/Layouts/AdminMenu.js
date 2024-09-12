// AdminMenu.js
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { Button } from 'antd';

const AdminMenu = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();
    const [open, setOpen] = useState(true);

    const handleLogOut = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth');
        navigate('/login')
        toast.success('Logged out successfully');
    }
    const Menus = [
        { route: 'create-category', title: 'Create Category', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { route: 'create-product', title: 'Create Product', icon: 'M12 4v16m8-8H4' },
        { route: 'users', title: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { route: 'orders', title: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
        { route: 'products', title: 'Update Product', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
    ];

    return (
        <div className={`${open ? 'w-64' : 'w-20'} bg-indigo-800 text-white p-5 pt-8 relative duration-300`}>
            <button
                className="absolute -right-3 top-9 w-7 h-7 rounded-full bg-white text-indigo-800 flex items-center justify-center cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                )}
            </button>
            <div className="flex items-center space-x-4 mb-6">
                <Link to="/dashboard/admin">
                    <img src="/admin-sidebar-images/logo.png" alt="logo" className="w-10 h-10" />
                </Link>
                <h1 className={`text-white font-medium text-xl duration-200 ${!open && 'hidden'}`}>
                    Admin Panel
                </h1>
            </div>
            <ul className="pt-2">
                {Menus.map((menu, index) => (
                    <NavLink
                        key={index}
                        to={`/dashboard/admin/${menu.route}`}
                        className={({ isActive }) =>
                            `flex items-center gap-x-4 cursor-pointer p-2 hover:bg-indigo-700 rounded-md mt-2 ${isActive ? 'bg-indigo-700' : ''
                            }`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menu.icon} />
                        </svg>
                        <span className={`${!open && 'hidden'} origin-left duration-200`}>
                            {menu.title}
                        </span>
                    </NavLink>
                ))}
                <Button
                    onClick={handleLogOut}
                    className="flex items-center gap-x-4 cursor-pointer p-2 hover:bg-indigo-700 rounded-md mt-8"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className={`${!open && 'hidden'} origin-left duration-200`} >
                        Log Out
                    </span>
                </Button>
            </ul>
        </div>
    );
};

export default AdminMenu;
