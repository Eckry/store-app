import { createContext } from "react";
import products from "../products.json";


export const CartContext = createContext(null);

export function CartProvider({children}){
  const [cart, setCart] = useState([products]);
  const [productSelected, setProductSelected] = useState({});
  
  <CartContext.Provider value={{cart, setCart, productSelected, setProductSelected}}>
    {children}
  </CartContext.Provider>
}