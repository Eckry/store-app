import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const prevCart = localStorage.getItem("cart");
    if (prevCart) {
      return JSON.parse(prevCart);
    }
    return [];
  });

  const [productSelected, setProductSelected] = useState(() => {
    const prevSelected = localStorage.getItem("productSelected");
    if (prevSelected) {
      return JSON.parse(prevSelected);
    }
    return {};
  });

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
