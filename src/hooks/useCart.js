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
      localStorage.setItem("cart", JSON.stringify(newCart));
      localStorage.setItem(
        "productSelected",
        JSON.stringify(newCart[productIndex])
      );
      setCart(newCart);
      return setProductSelected(newCart[productIndex]);
    }
    setCart([...cart, { ...productToAdd, quantity: 1 }]);
    setProductSelected({ ...productToAdd, quantity: 1 });

    localStorage.setItem(
      "cart",
      JSON.stringify([...cart, { ...productToAdd, quantity: 1 }])
    );
    localStorage.setItem(
      "productSelected",
      JSON.stringify({ ...productToAdd, quantity: 1 })
    );
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
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  function deleteProduct(productToDelete) {
    const newCart = cart.filter((product) => product.id !== productToDelete.id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    if (newCart.length !== 0)
      localStorage.setItem("productSelected", JSON.stringify(newCart[0]));
    else localStorage.removeItem("productSelected");
    setCart(newCart);
    setProductSelected(newCart[0]);
  }

  function selectProduct(productToSelect) {
    localStorage.setItem("productSelected", JSON.stringify(productToSelect));
    setProductSelected(productToSelect);
  }

  return {
    cart,
    setCart,
    productSelected,
    notification,
    selectProduct,
    deleteProduct,
    removeProduct,
    addProduct,
    setNotification,
  };
}
