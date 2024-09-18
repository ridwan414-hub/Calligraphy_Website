import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
        <div className='bg-white shadow-md rounded-lg p-4'>
            <h4 className="text-lg font-semibold mb-4">Dashboard</h4>
            <nav>
                <NavLink to="/dashboard/user/profile" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded">Profile</NavLink>
                <NavLink to="/dashboard/user/orders" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded">Orders</NavLink>
            </nav>
        </div>
    );
};

export default UserMenu;
