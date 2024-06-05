import React from 'react'
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Card({ product }) {
    const [cart, setCart] = useCart();
    const navigate=useNavigate()

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg ring-2 ring-violet-800 ring-opacity-40 max-w-sm w-72">
            <div className="relative">
                <img className="w-full p-1 rounded-lg object-cover aspect-square" src={`/api/v1/product/product-photo/${product?._id}`} alt={product?.name} />
                <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{product?.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product?.description.substring(0,50)}</p>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">Tk {product?.price}</span>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem(
                                'cart',
                                JSON.stringify([...cart, product])
                            );
                            toast.success('Item Added to cart');
                        }} >
                        Add to Cart
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(`/product/${product?.slug}`)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>

    )
}
