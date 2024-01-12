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
    setNotification(true);

    const productIndex = cart.findIndex(
      (product) => productToAdd.id === product.id
    );
    if (productIndex >= 0) {
      const newCart = cart.with(productIndex, {
        ...cart[productIndex],
        quantity: cart[productIndex].quantity + 1,
      });
      setCart(newCart);
      return setProductSelected(newCart[productIndex]);
    }
    setCart([...cart, { ...productToAdd, quantity: 1 }]);
    setProductSelected({ ...productToAdd, quantity: 1 });
  }

  function removeProduct(productToRemove) {
    const newCart = cart.map((product) => {
      if (productToRemove.id === product.id && product.quantity > 1) {
        const productUpdated = { ...product, quantity: product.quantity - 1 };
        setProductSelected(productUpdated);
        return productUpdated;
      }
      return product;
    });

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
