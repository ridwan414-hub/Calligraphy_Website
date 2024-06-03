import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const categories = useCategory()
    const [cart] = useCart()
    const handleLogOut = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth');
        toast.success('Logged out successfully');
    }

    return (
        <>
            <nav className="flex justify-between bg-body-tertiary">
                <div className="container-fluid">
                    <Link to='/' className="text-xl font-bold"> 🛒Artwork Gallery</Link>
                    <button className="flex items-center" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="w-6 h-6" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="flex space-x-4 ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="flex items-center">
                                <NavLink
                                    to='/' className="text-gray-700 hover:text-gray-900"
                                >Home
                                </NavLink>
                            </li>
                            <li className="relative">
                                <Link
                                    className="cursor-pointer"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="absolute hidden">
                                    <li>
                                        <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li key={c._id}>
                                            <Link
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {!auth.user ? (<>
                                <li className="flex items-center">
                                    <NavLink to='/register' className="text-gray-700 hover:text-gray-900" >Register</NavLink>
                                </li>
                                <li className="flex items-center">
                                    <NavLink to='/login' className="text-gray-700 hover:text-gray-900" >Login</NavLink>
                                </li>
                            </>) : (<>
                                <li className="relative">
                                    <Link className="cursor-pointer" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user?.name}
                                    </Link>
                                    <ul className="absolute hidden">
                                        <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Dashboard</NavLink></li>
                                        <li ><NavLink to='/login' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={handleLogOut}>Logout</NavLink></li>
                                    </ul>
                                </li>
                            </>)}

                            <li className="flex items-center">
                                <Badge count={cart?.length} showZero>
                                    <NavLink to='/cart' className="text-gray-700 hover:text-gray-900">Cart</NavLink>

                                </Badge>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Header;
