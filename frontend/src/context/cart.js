import { createContext, useContext, useEffect, useState, } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        let exixstingCartItems = localStorage.getItem('cart')
        if (exixstingCartItems) {
            setCart(JSON.parse(exixstingCartItems))
        }
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };