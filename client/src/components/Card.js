import React from 'react'
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Skeleton from './Skeleton';

export default function Card({ product }) {
    const [cart, setCart] = useCart();
    const navigate = useNavigate()

    return (
        !product ? (<Skeleton />) : (
            <div className=" bg-gradient-to-tr from-blue-200 from-60% via-blue-300 via-90% to-90% hover: rounded-lg overflow-hidden shadow-lg ring-1 ring-violet-800 ring-opacity-40 max-w-sm w-72 mx-2 my-4 hover:scale-105 hover:shadow-xl transform transition duration-300 ">
                <div className="relative">
                    <img className="w-full p-1 rounded-lg object-cover aspect-square" src={`/api/v1/product/product-photo/${product?._id}`} alt={product?.name} />
                    <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">{product?.category?.name}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">{product?.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product?.description.substring(0, 50)}...</p>
                    <div className="flex items-center flex-shrink justify-between">
                        <span className="font-bold text-sm">Tk {product?.price}</span>
                        <button className="bg-red-500 flex items-center hover:bg-red-600 text-white py-1 px-1 text-xs rounded"
                            onClick={() => {
                                setCart([...cart, product]);
                                localStorage.setItem(
                                    'cart',
                                    JSON.stringify([...cart, product])
                                );
                                toast.success('Item Added to cart');
                            }} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>

                            <h1 className='py-1'>Add to Cart</h1>
                        </button>
                        <button className="bg-violet-500 flex items-center hover:bg-violet-600 text-white text-xs py-1 px-1 rounded"
                            onClick={() => navigate(`/product/${product?.slug}`)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            <h1 className='py-1'>View Details</h1>
                        </button>
                    </div>
                </div>
            </div>)

    )
}
