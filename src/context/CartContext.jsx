import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [productSelected, setProductSelected] = useState({});
  const [notification, setNotification] = useState(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        productSelected,
        setProductSelected,
        notification,
        setNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
