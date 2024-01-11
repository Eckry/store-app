import { useReducer } from "react";
import { NUMBER_OF_PRODUCTS_PER_PAGE, actionTypes } from "../constants.json";

const updateQuantity = (number, payload, state) => {
  const newShoppingCart = state.shoppingCart.map((product) => {
    if (product.id === payload.id)
      return { ...product, quantity: product.quantity + number };
    else return product;
  });
  return newShoppingCart;
};

const getPrevAndNext = (payload, state) => {
  const previewIndex = state.filteredProducts.indexOf(payload);

  const prev = previewIndex - 1;
  const next = previewIndex + 1;
  return [prev, next];
};

const initialState = {
  numberOfPages: Math.ceil(21 / NUMBER_OF_PRODUCTS_PER_PAGE),
  currentPage: 0,
  currentPreview: {},
  shoppingCart: [],
  showCart: false,
  productSelectedInCart: {},
  notification: false,
  showPrev: true,
  showNext: true,
  showFilters: false,
};

function reducer(state, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.SET_NEXT_PAGE: {
      if (state.currentPage >= state.numberOfPages - 1)
        return { ...state, currentPage: state.numberOfPages - 1 };
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    }

    case actionTypes.SET_PREV_PAGE: {
      if (state.currentPage <= 0) return { ...state, currentPage: 0 };
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    }

    case actionTypes.SET_PAGE_NUMBER: {
      const { payload } = action;
      return {
        ...state,
        currentPage: parseInt(payload.target.value),
      };
    }

    case actionTypes.SET_CURRENT_PREVIEW: {
      const { payload } = action;

      if (Object.keys(payload).length === 0)
        return { ...state, currentPreview: payload };
      const [prev, next] = getPrevAndNext(payload, state);

      return {
        ...state,
        currentPreview: payload,
        showPrev: prev >= 0,
        showNext: next < state.filteredProducts.length,
      };
    }

    case actionTypes.ADD_PRODUCT_TO_SHOPPING_CART: {
      const { payload } = action;

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

    case actionTypes.GO_PREV_PREVIEW: {
      const { payload } = action;

      const [prev] = getPrevAndNext(payload, state);

      return {
        ...state,
        currentPreview: state.filteredProducts[prev],
        showPrev: prev > 0,
        showNext: true,
      };
    }

    case actionTypes.GO_NEXT_PREVIEW: {
      const { payload } = action;

      const [, next] = getPrevAndNext(payload, state);

      return {
        ...state,
        currentPreview: state.filteredProducts[next],
        showPrev: true,
        showNext: next < state.filteredProducts.length - 1,
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
      filteredProducts,
      currentPage,
      currentPreview,
      shoppingCart,
      showCart,
      productSelectedInCart,
      showPrev,
      showNext,
      notification,
      numberOfPages,
      showFilters,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const setFilteredProducts = (payload) => {
    dispatch({ type: "SET_FILTERED_PRODUCTS", payload });
  };

  const setNextPage = () => {
    dispatch({ type: "SET_NEXT_PAGE" });
  };

  const setPrevPage = () => {
    dispatch({ type: "SET_PREV_PAGE" });
  };

  const setPageNumber = (payload) => {
    dispatch({ type: "SET_PAGE_NUMBER", payload });
  };

  const setCurrentPreview = (payload) => {
    dispatch({ type: "SET_CURRENT_PREVIEW", payload });
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

  const goPrevPreview = (payload) => {
    dispatch({ type: "GO_PREV_PREVIEW", payload });
  };

  const goNextPreview = (payload) => {
    dispatch({ type: "GO_NEXT_PREVIEW", payload });
  };

  const interchangeShowFilters = () => {
    dispatch({ type: "INTERCHANGE_SHOW_FILTERS" });
  };

  return {
    currentPage,
    filteredProducts,
    currentPreview,
    shoppingCart,
    showCart,
    productSelectedInCart,
    notification,
    showPrev,
    showNext,
    numberOfPages,
    showFilters,
    deleteFromShoppingCart,
    updateQuantity,
    setProductSelectedInCart,
    interchangeShowCart,
    addProductToShoppingCart,
    setCurrentPreview,
    setPrevPage,
    setPageNumber,
    setNextPage,
    setFilteredProducts,
    goPrevPreview,
    goNextPreview,
    interchangeShowFilters,
  };
}
