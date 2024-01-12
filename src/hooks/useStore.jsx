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
  shoppingCart: [],
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

    case actionTypes.ADD_PRODUCT_TO_SHOPPING_CART: {
      const { payload } = action;
      console.log(payload)
      const productToAdd = state.shoppingCart.find(
        (product) => product.id === payload.id
      );

      if (!productToAdd)
        return {
          ...state,
          notification: true,
          shoppingCart: [...state.shoppingCart, { ...payload, quantity: 1 }],
          productSelectedInCart: { ...payload, quantity: 1 },
        };

      const newShoppingCart = updateQuantity(1, payload, state);

      return {
        ...state,
        notification: true,
        shoppingCart: newShoppingCart,
        productSelectedInCart: {
          ...productToAdd,
          quantity: productToAdd.quantity + 1,
        },
      };
    }

    case actionTypes.INTERCHANGE_SHOW_CART: {
      return {
        ...state,
        notification: false,
        showCart: !state.showCart,
      };
    }

    case actionTypes.SET_PRODUCT_SELECTED_IN_CART: {
      const { payload } = action;
      return {
        ...state,
        productSelectedInCart: payload,
      };
    }

    case actionTypes.UPDATE_QUANTITY: {
      const { number, product } = action.payload;
      if (product.quantity + number <= 0) return state;
      const newShoppingCart = updateQuantity(number, product, state);
      return {
        ...state,
        shoppingCart: newShoppingCart,
        productSelectedInCart: {
          ...product,
          quantity: product.quantity + number,
        },
      };
    }

    case actionTypes.DELETE_FROM_SHOPPING_CART: {
      const newShoppingCart = state.shoppingCart.filter(
        (product) => product.id !== state.productSelectedInCart.id
      );
      let newProductSelectedIndex = state.shoppingCart.findIndex(
        (product) => product.id === state.productSelectedInCart.id
      );
      if (newProductSelectedIndex === 0) newProductSelectedIndex += 1;
      else newProductSelectedIndex -= 1;

      return {
        ...state,
        shoppingCart: newShoppingCart,
        productSelectedInCart: state.shoppingCart[newProductSelectedIndex],
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
