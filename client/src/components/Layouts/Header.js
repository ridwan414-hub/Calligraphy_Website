import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const categories = useCategory();
    const [cart] = useCart();
    const handleLogOut = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        });
        localStorage.removeItem('auth');
        toast.success('Logged out successfully');
    };

    return (
        <div className="navbar bg-gradient-to-r from-indigo-100 from-10% via-sky-100 via-30% to-emerald-100 to-90% shadow-sm opacity-95">
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li>
                            <NavLink to='/categories'>Categories</NavLink>
                            <ul className="p-2">
                                {categories.map((category) => (
                                    <li key={category._id}><NavLink to={`/category/${category?.slug}`}>{category?.name}</NavLink></li>
                                ))}
                            </ul>
                        </li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        <li><NavLink to='/contact'>Contact us</NavLink></li>
                        {!auth.user ? (
                            <>
                                <li><NavLink to='/register' className="btn btn-outline border-blue-600 text-gray-700 hover:text-white">Register</NavLink></li>
                                <li><NavLink to='/login' className="btn btn-outline border-red-500 text-gray-700 hover:text-white">Login</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink></li>
                                <li><NavLink to='/login' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={handleLogOut}>Logout</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>
                <NavLink to="/" className="flex items-center flex-shrink-0 mr-6">
                    <img className="w-12 h-12 mr-2 rounded-full" src='https://img.freepik.com/premium-vector/art-gallery-logo-design_92167-616.jpg?w=740' alt='logo' />
                    <span className="font-semibold text-xl text-gray-800">Artwork Gallery</span>
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal flex gap-1 px-1">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li>
                        <details>
                            <summary>Categories</summary>
                            <ul className="p-2">
                                {categories.map((category) => (
                                    <li key={category._id}><NavLink to={`/category/${category?.slug}`}>{category?.name}</NavLink></li>
                                ))}
                            </ul>
                        </details>
                    </li>
                    <li><NavLink to='/about'>About</NavLink></li>
                    <SearchInput />
                    <li><NavLink to='/contact'>Contact Us</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end flex items-center gap-4">
                {!auth.user ? (
                    <ul className='hidden lg:flex gap-2'>
                        <li>
                            <NavLink to='/register' className="btn btn-outline border-blue-600 text-gray-700 hover:text-white">Register</NavLink>
                        </li>
                        <li>
                            <NavLink to='/login' className="btn btn-outline border-red-500 text-gray-700 hover:text-white">Login</NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className='lg:flex items-center gap-2'>
                        <li className='lg:hidden mx-2'>
                            <details className="relative">
                                <summary className="flex items-center cursor-pointer">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                                            <span>{auth?.user?.name.split('')[0] + auth?.user?.name.split('')[1]}</span>
                                        </div>
                                    </div>
                                </summary>
                                <ul className="absolute mt-2 w-24 bg-white shadow-lg rounded-box z-10 left-0">
                                    <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Dashboard</NavLink></li>
                                    <li><NavLink to='/login' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={handleLogOut}>Logout</NavLink></li>
                                </ul>
                            </details>
                        </li>
                        <li className='hidden lg:block'>
                            <details className="relative">
                                <summary className="flex items-center cursor-pointer">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                                            <span>{auth?.user?.name.split('')[0] + auth?.user?.name.split('')[1]}</span>
                                        </div>
                                    </div>
                                    <span className="ml-2">{auth?.user?.name}</span>
                                </summary>
                                <ul className="absolute mt-2 w-40 bg-white shadow-lg rounded-box z-10 right-0">
                                    <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Dashboard</NavLink></li>
                                    <li><NavLink to='/login' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={handleLogOut}>Logout</NavLink></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                )}
                <div className="flex items-center mr-4">
                    <Badge count={cart?.length} showZero>
                        <NavLink to='/cart' className="text-gray-700 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </NavLink>
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export default Header;
