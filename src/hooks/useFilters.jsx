import products from "../products.json";
import categories from "../categories.json";
import { useReducer } from "react";

const categoriesMap = {};
categories.forEach((category) => {
  categoriesMap[category] = true;
});

const initialState = {
  price: { min: 0, max: 1000 },
  searchedCategories: categoriesMap,
  filteredProducts: products,
};

function reducer(state, action) {
  const { type } = action;

  if (type === "SET_FILTERED_PRODUCTS") {
    const filteredProducts = products.filter(
      (product) =>
        product.price >= state.price.min &&
        product.price <= state.price.max &&
        (!state.searchedCategories[product.category] ||
          !Object.values(state.searchedCategories).some((boolean) => !boolean))
    );
    return {
      ...state,
      filteredProducts: filteredProducts,
    };
  }

  if (type === "SET_PRICE_FILTER") {
    const { payload } = action;
    payload.event.preventDefault();
    const newPrice =
      payload.id === "min"
        ? Math.min(payload.event.target.value, state.price.max - 200)
        : Math.max(payload.event.target.value, state.price.min + 200);
    return {
      ...state,
      price:
        payload.id === "min"
          ? { min: newPrice, max: state.price.max }
          : { min: state.price.min, max: newPrice },
    };
  }

  if (type === "SET_SEARCHED_CATEGORIES") {
    const { payload } = action;
    const newSearchedCategories = {}
    for(let category in state.searchedCategories){
      if(category === payload) newSearchedCategories[category] = !state.searchedCategories[category]
      else newSearchedCategories[category] = state.searchedCategories[category]
    }
    return {...state, searchedCategories: newSearchedCategories};
  }

  return state;
}

export default function useFilters() {
  const [{ price, searchedCategories, filteredProducts }, dispatch] =
    useReducer(reducer, initialState);

  const setFilteredProducts = () => {
    dispatch({ type: "SET_FILTERED_PRODUCTS" });
  };

  const setPriceFilter = (payload) => {
    dispatch({ type: "SET_PRICE_FILTER", payload });
  };

  const setSearchedCategories = (payload) => {
    dispatch({ type: "SET_SEARCHED_CATEGORIES", payload });
  };

  return {
    price,
    searchedCategories,
    filteredProducts,
    setFilteredProducts,
    setPriceFilter,
    setSearchedCategories,
  };
}
