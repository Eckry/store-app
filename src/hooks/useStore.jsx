import { useReducer } from "react";
import { actionTypes } from "../constants.json";

const initialState = {
  currentPage: 0,
  showCart: false,
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

  const interchangeShowCart = () => {
    dispatch({ type: "INTERCHANGE_SHOW_CART" });
  };

  const interchangeShowFilters = () => {
    dispatch({ type: "INTERCHANGE_SHOW_FILTERS" });
  };

  return {
    currentPage,
    showCart,
    showFilters,
    interchangeShowCart,
    setCurrentPage,
    interchangeShowFilters,
  };
}
