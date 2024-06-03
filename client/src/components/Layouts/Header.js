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
    return (<div className="navbar bg-base-100">
        <div className="navbar-start">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
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
                </ul>
            </div>
            <NavLink className="btn btn-ghost text-xl">daisyUI</NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
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
            </ul>
        </div>
        <div className="navbar-end gap-4">
            <ul>
                <li className="flex items-center">
                    <Badge count={cart?.length} showZero>
                        <NavLink to='/cart' className="text-gray-700 hover:text-gray-900"> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg></NavLink>
                    </Badge>
                </li>
            </ul>
            {!auth.user ? (
                <ul className='flex'>
                    <li>
                        <NavLink to='/register' className="btn text-gray-700 hover:text-gray-900" >Register</NavLink>
                    </li>
                    <li>
                        <NavLink to='/login' className="btn text-gray-700 hover:text-gray-900" >Login</NavLink>
                    </li>
                </ul>) : (<ul className='menu menu-horizontal mx-4'>
                    <li>
                        <details>
                            <summary>{auth?.user?.name}</summary>
                            <ul className="absolute">
                                <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} >Dashboard</NavLink></li>
                                <li ><NavLink to='/login' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={handleLogOut}>Logout</NavLink></li>
                            </ul>
                        </details>
                    </li>
                </ul>)}
        </div>
    </div>)
    // return (
    //     <>
    //         <nav className="flex justify-between bg-body-tertiary">
    //             <div className="container-fluid">
    //                 <Link to='/' className="text-xl font-bold"> 🛒Artwork Gallery</Link>
    //                 <button className="flex items-center" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    //                     <span className="w-6 h-6" />
    //                 </button>
    //                 <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    //                     <ul className="flex space-x-4 ms-auto mb-2 mb-lg-0">
    //                         <SearchInput />
    //                         <li className="flex items-center">
    //                             <NavLink
    //                                 to='/' className="text-gray-700 hover:text-gray-900"
    //                             >Home
    //                             </NavLink>
    //                         </li>
    //                         <li className="relative">
    //                             <Link
    //                                 className="cursor-pointer"
    //                                 to={"/categories"}
    //                                 data-bs-toggle="dropdown"
    //                             >
    //                                 Categories
    //                             </Link>
    //                             <ul className="absolute hidden">
    //                                 <li>
    //                                     <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" to={"/categories"}>
    //                                         All Categories
    //                                     </Link>
    //                                 </li>
    //                                 {categories?.map((c) => (
    //                                     <li key={c._id}>
    //                                         <Link
    //                                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    //                                             to={`/category/${c.slug}`}
    //                                         >
    //                                             {c.name}
    //                                         </Link>
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                         </li>

    //                         {!auth.user ? (<>
    //                             <li className="flex items-center">
    //                                 <NavLink to='/register' className="text-gray-700 hover:text-gray-900" >Register</NavLink>
    //                             </li>
    //                             <li className="flex items-center">
    //                                 <NavLink to='/login' className="text-gray-700 hover:text-gray-900" >Login</NavLink>
    //                             </li>
    //                         </>) : (<>
    //                             <li className="relative">
    //                                 <Link className="cursor-pointer" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //                                     {auth?.user?.name}
    //                                 </Link>
    //                                 <ul className="absolute hidden">
    //                                     <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Dashboard</NavLink></li>
    //                                     <li ><NavLink to='/login' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={handleLogOut}>Logout</NavLink></li>
    //                                 </ul>
    //                             </li>
    //                         </>)}

    //                         <li className="flex items-center">
    //                             <Badge count={cart?.length} showZero>
    //                                 <NavLink to='/cart' className="text-gray-700 hover:text-gray-900">Cart</NavLink>

    //                             </Badge>
    //                         </li>

    //                     </ul>
    //                 </div>
    //             </div>
    //         </nav>

    //     </>
    // );
};

export default Header;
