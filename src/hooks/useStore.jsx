import { useReducer } from "react";
import { actionTypes } from "../constants.json";

const updateQuantity = (number, payload, state) => {
  const newShoppingCart = state.shoppingCart.map((product) => {
    if (product.id === payload.id)
      return { ...product, quantity: product.quantity + number };
    else return product;
  });
  return newShoppingCart;
};

const initialState = {
  currentPage: 0,
  showCart: false,
  productSelectedInCart: {},
  notification: false,
  showFilters: false,
};

function reducer(state, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.SET_PAGE_NUMBER: {
      const { payload } = action;
      return {
        ...state,
        currentPage: payload,
      };
    }

    case actionTypes.INTERCHANGE_SHOW_CART: {
      return {
        ...state,
        notification: false,
        showCart: !state.showCart,
      };
    }

    case actionTypes.INTERCHANGE_SHOW_FILTERS: {
      return {
        ...state,
        showFilters: !state.showFilters,
      };
    }
    default:
      return state;
  }
}

export default function useStore() {
  const [
    {
      currentPage,
      shoppingCart,
      showCart,
      productSelectedInCart,
      notification,
      showFilters,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const setCurrentPage = (payload) => {
    dispatch({ type: "SET_PAGE_NUMBER", payload });
  };

  const addProductToShoppingCart = (payload) => {
    dispatch({ type: "ADD_PRODUCT_TO_SHOPPING_CART", payload });
  };

  const interchangeShowCart = () => {
    dispatch({ type: "INTERCHANGE_SHOW_CART" });
  };

  const setProductSelectedInCart = (payload) => {
    dispatch({ type: "SET_PRODUCT_SELECTED_IN_CART", payload });
  };

  const updateQuantity = (payload) => {
    dispatch({ type: "UPDATE_QUANTITY", payload });
  };

  const deleteFromShoppingCart = () => {
    dispatch({ type: "DELETE_FROM_SHOPPING_CART" });
  };

  const interchangeShowFilters = () => {
    dispatch({ type: "INTERCHANGE_SHOW_FILTERS" });
  };

  return {
    currentPage,
    shoppingCart,
    showCart,
    productSelectedInCart,
    notification,
    showFilters,
    deleteFromShoppingCart,
    updateQuantity,
    setProductSelectedInCart,
    interchangeShowCart,
    addProductToShoppingCart,
    setCurrentPage,
    interchangeShowFilters,
  };
}
