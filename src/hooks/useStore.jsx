import products from "../products.json";
import categories from "../categories.json";
import { useReducer } from "react";

const categoriesMap = {};
categories.forEach((category) => {
  categoriesMap[category] = true;
});

const getCarousel = (products) => {
  const carouselProducts = [];
  for (let i = 0; i < products.length; i += 9) {
    carouselProducts.push(products.slice(i, i + 9));
  }
  return carouselProducts;
};

const initialCarousel = getCarousel(products);

const initialState = {
  price: { min: 0, max: 1000 },
  searchedCategories: categoriesMap,
  filteredProducts: initialCarousel,
  currentPage: 0,
  currentPreview: {},
  shoppingCart: [],
  showCart: false,
  productSelectedInCart: {},
};

function reducer(state, action) {
  const updateQuantity = (number, payload) => {
    const newShoppingCart = state.shoppingCart.map((product) => {
      if (product.id === payload.id)
        return { ...product, quantity: product.quantity + number };
      else return product;
    });
    return newShoppingCart;
  };

  const { type } = action;

  if (type === "SET_FILTERED_PRODUCTS") {
    const filteredProducts = products.filter(
      (product) =>
        product.price >= state.price.min &&
        product.price <= state.price.max &&
        (!state.searchedCategories[product.category] ||
          !Object.values(state.searchedCategories).some((boolean) => !boolean))
    );

    const filteredCarousel = getCarousel(filteredProducts);
    let newCurrentPage = 0;

    if (filteredCarousel.length - 1 < state.currentPage)
      newCurrentPage = filteredCarousel.length - 1;
    else newCurrentPage = state.currentPage;

    return {
      ...state,
      filteredProducts: filteredCarousel,
      currentPage: newCurrentPage,
    };
  }

  if (type === "SET_PRICE_FILTER") {
    const { payload } = action;
    payload.event.preventDefault();
    const newPrice =
      payload.id === "min"
        ? Math.min(payload.event.target.value, state.price.max - 300)
        : Math.max(payload.event.target.value, state.price.min + 300);
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
    const newSearchedCategories = {};
    for (let category in state.searchedCategories) {
      if (category === payload)
        newSearchedCategories[category] = !state.searchedCategories[category];
      else newSearchedCategories[category] = state.searchedCategories[category];
    }
    return { ...state, searchedCategories: newSearchedCategories };
  }

  if (type === "SET_NEXT_PAGE") {
    if (state.currentPage == state.filteredProducts.length - 1) return state;
    return {
      ...state,
      currentPage: state.currentPage + 1,
    };
  }

  if (type === "SET_PREV_PAGE") {
    if (state.currentPage === 0) return state;
    return {
      ...state,
      currentPage: state.currentPage - 1,
    };
  }

  if (type === "SET_PAGE_NUMBER") {
    const { payload } = action;
    return {
      ...state,
      currentPage: parseInt(payload.target.value),
    };
  }

  if (type === "SET_CURRENT_PREVIEW") {
    const { payload } = action;
    return {
      ...state,
      currentPreview: payload,
    };
  }

  if (type === "ADD_PRODUCT_TO_SHOPPING_CART") {
    const { payload } = action;

    const productToAdd = state.shoppingCart.find(
      (product) => product.id === payload.id
    );

    if (!productToAdd)
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, { ...payload, quantity: 1 }],
        productSelectedInCart: { ...payload, quantity: 1 },
      };

    const newShoppingCart = updateQuantity(1, payload);

    return {
      ...state,
      shoppingCart: newShoppingCart,
      productSelectedInCart: {
        ...productToAdd,
        quantity: productToAdd.quantity + 1,
      },
    };
  }

  if (type === "INTERCHANGE_SHOW_CART") {
    return {
      ...state,
      showCart: !state.showCart,
    };
  }

  if (type === "SET_PRODUCT_SELECTED_IN_CART") {
    const { payload } = action;
    return {
      ...state,
      productSelectedInCart: payload,
    };
  }

  if (type === "UPDATE_QUANTITY") {
    const { number, product } = action.payload;
    if(product.quantity + number <= 0) return state
    const newShoppingCart = updateQuantity(number, product);
    return {
      ...state,
      shoppingCart: newShoppingCart,
      productSelectedInCart: { ...product, quantity: product.quantity + number },
    };
  }

  return state;
}

export default function useStore() {
  const [
    {
      price,
      searchedCategories,
      filteredProducts,
      currentPage,
      currentPreview,
      shoppingCart,
      showCart,
      productSelectedInCart,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const setFilteredProducts = () => {
    dispatch({ type: "SET_FILTERED_PRODUCTS" });
  };

  const setPriceFilter = (payload) => {
    dispatch({ type: "SET_PRICE_FILTER", payload });
  };

  const setSearchedCategories = (payload) => {
    dispatch({ type: "SET_SEARCHED_CATEGORIES", payload });
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

  return {
    currentPage,
    price,
    searchedCategories,
    filteredProducts,
    currentPreview,
    shoppingCart,
    showCart,
    productSelectedInCart,
    updateQuantity,
    setProductSelectedInCart,
    interchangeShowCart,
    addProductToShoppingCart,
    setCurrentPreview,
    setPrevPage,
    setPageNumber,
    setNextPage,
    setFilteredProducts,
    setPriceFilter,
    setSearchedCategories,
  };
}
