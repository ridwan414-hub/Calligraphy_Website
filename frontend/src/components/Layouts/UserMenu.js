import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="flex flex-col">
                    <h4 className="text-center">Dashboard</h4>
                    <NavLink to="/dashboard/user/profile" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Profile</NavLink>
                    <NavLink to="/dashboard/user/orders" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Orders</NavLink>
                </div>
            </div>
        </>
    );
};

export default UserMenu;
