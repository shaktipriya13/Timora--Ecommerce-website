import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
// CartProvider is a React component that will "provide" the cart state to any child components
const CartProvider = ({ children }) => {
    // 1️⃣ Create a cart state using useState. It starts as an empty array.
    const [cart, setCart] = useState([]);

    // 2️⃣ useEffect runs only once (on component mount), because of the empty dependency array []
    useEffect(() => {
        // 3️⃣ Get cart data (if any) from localStorage
        let existingCartItem = localStorage.getItem("cart");

        // 4️⃣ If cart exists in localStorage, parse it from string to array and set it to state
        if (existingCartItem) setCart(JSON.parse(existingCartItem));
    }, []);

    // 5️⃣ Provide the cart and setCart function to all child components
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}  {/* Render whatever components are wrapped inside this provider */}
        </CartContext.Provider>
    );
};


// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };