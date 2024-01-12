import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function useCart() {
  const {
    cart,
    setCart,
    productSelected,
    setProductSelected,
    notification,
    setNotification,
  } = useContext(CartContext);

  function addProduct(productToAdd) {
    setProductSelected(productToAdd);
    setNotification(true);

    const productIndex = cart.findIndex(
      (product) => productToAdd.id === product.id
    );
    if (productIndex >= 0) {
      const newCart = [
        ...cart,
        { ...productToAdd, quantity: productToAdd.quantity + 1 },
      ];
      return setCart(newCart);
    }
    setCart([...cart, { ...productToAdd, quantity: 1 }]);
  }

  function removeProduct(productToRemove) {
    const newCart = [
      ...cart,
      { ...productToRemove, quantity: productToRemove.quantity - 1 },
    ];
    setCart(newCart);
  }

  function deleteProduct(productToDelete) {
    const newCart = cart.filter((product) => product !== productToDelete);
    setCart(newCart);
  }

  function selectProduct(productToSelect) {
    setProductSelected(productToSelect);
  }

  return {
    cart,
    setCart,
    productSelected,
    setProductSelected,
    notification,
    selectProduct,
    deleteProduct,
    removeProduct,
    addProduct,
  };
}
