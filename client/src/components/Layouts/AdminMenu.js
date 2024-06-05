import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const AdminMenu = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
        { route: 'create-category', title: 'Create Category', src: 'Chart_fill' },
        { route: 'create-product', title: 'Create Product', src: 'Chat' },
        { route: 'users', title: 'Users', src: 'User', gap: false },
        { route: 'orders ', title: 'Orders', src: 'Setting', gap: false },
        { route: 'products', title: 'Update Product', src: 'Blog' },
        { route: 'Logout', title: 'Log Out', src: 'Logout', gap: true },
    ];

    return (
        <div
            className={` ${open ? 'w-72' : 'w-20 '
                } bg-dark-purple p-5  pt-8 relative duration-300`}
        >
            <img
                src="/admin-sidebar-images/control.png"
                alt='control'
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
                onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
                <Link to='/dashboard/admin'><img
                    src="/admin-sidebar-images/logo.png"
                    alt='logo'
                    className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`}
                /></Link>
                <h1
                    className={`text-white origin-left font-medium text-xl duration-200 ${!open && 'scale-0'
                        }`}
                >
                    Admin Panel
                </h1>
            </div>
            <ul className="pt-6">
                {Menus.map((Menu, index) => (
                    <NavLink key={index} to={`/dashboard/admin/${Menu.route}`}>
                        <li
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
                            ${Menu.gap ? 'm-10 mt-24' : 'mt-2'} ${index === 0 && 'bg-light-white'
                                } `}
                        >
                            <img src={`/admin-sidebar-images/${Menu.src}.png`}
                                alt='control'
                            />
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    </NavLink>
                ))}
            </ul>
        </div>
    );
};

export default AdminMenu;
