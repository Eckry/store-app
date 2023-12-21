import products from "../products.json";
import categories from "../categories.json";
import { useReducer } from "react";

const updateQuantity = (number, payload, state) => {
  const newShoppingCart = state.shoppingCart.map((product) => {
    if (product.id === payload.id)
      return { ...product, quantity: product.quantity + number };
    else return product;
  });
  return newShoppingCart;
};

const getPrevAndNext = (payload, state) => {
  let carouselIndex = state.filteredProducts.findIndex((carousel) =>
    carousel.includes(payload)
  );
  const previewIndex = state.filteredProducts[carouselIndex].indexOf(payload);

  let prev = previewIndex - 1;

  if (previewIndex === 0 && carouselIndex > 0) {
    prev = state.filteredProducts[carouselIndex - 1].length - 1;
  }

  let next = previewIndex + 1;

  if (
    previewIndex === state.filteredProducts[carouselIndex].length - 1 &&
    carouselIndex < state.filteredProducts.length - 1
  ) {
    next = 0;
  }

  return [prev, next, carouselIndex];
};

const getPrev = (payload, state) => {
  let [prev, , carouselIndex] = getPrevAndNext(payload, state);
  if (
    carouselIndex > 0 &&
    prev >= state.filteredProducts[carouselIndex - 1].length - 1
  ) {
    carouselIndex--;
  }
  return [prev, carouselIndex];
};

const getNext = (payload,state) => {
  let [, next, carouselIndex] = getPrevAndNext(payload, state);
  if (next === 0) {
    carouselIndex++;
  }

  return [next, carouselIndex];
};

const getCarousel = (products) => {
  const carouselProducts = [];
  for (let i = 0; i < products.length; i += 6) {
    carouselProducts.push(products.slice(i, i + 6));
  }
  return carouselProducts;
};

const categoriesMap = {};
categories.forEach((category) => {
  categoriesMap[category] = true;
});

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
  notification: false,
  showPrev: true,
  showNext: true,
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

    const filteredCarousel = getCarousel(filteredProducts);
    let newCurrentPage = 0;

    if (
      filteredCarousel.length - 1 < state.currentPage &&
      filteredCarousel.length !== 0
    )
      newCurrentPage = filteredCarousel.length - 1;
    else newCurrentPage = state.currentPage;

    return {
      ...state,
      filteredProducts: filteredCarousel,
      currentPage: newCurrentPage,
    };
  }

  if (type === "SET_PRICE_FILTER") {
    const { event, id } = action.payload;
    event.preventDefault();
    const newPrice =
      id === "min"
        ? Math.min(event.target.value, state.price.max - 300)
        : Math.max(event.target.value, state.price.min + 300);
    return {
      ...state,
      price:
        id === "min"
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
    if (Object.keys(payload).length === 0)
      return { ...state, currentPreview: payload };
    const [prev, next, carouselIndex] = getPrevAndNext(payload, state);
    return {
      ...state,
      currentPreview: payload,
      showPrev: prev !== -1,
      showNext: next !== state.filteredProducts[carouselIndex].length,
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

  if (type === "INTERCHANGE_SHOW_CART") {
    return {
      ...state,
      notification: false,
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

  if (type === "DELETE_FROM_SHOPPING_CART") {
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

  if (type === "GO_PREV_PREVIEW") {
    const { payload } = action;
    const [prev, newPreviewCarouselIndex] = getPrev(payload, state);
    return {
      ...state,
      currentPreview: state.filteredProducts[newPreviewCarouselIndex][prev],
      showPrev: prev !== 0 || newPreviewCarouselIndex > 0,
      showNext: true,
    };
  }

  if (type === "GO_NEXT_PREVIEW") {
    const { payload } = action;
    const [next, newPreviewCarouselIndex] = getNext(payload,state);
    return {
      ...state,
      currentPreview: state.filteredProducts[newPreviewCarouselIndex][next],
      showPrev: true,
      showNext:
        next !== state.filteredProducts[newPreviewCarouselIndex].length - 1 ||
        newPreviewCarouselIndex < state.filteredProducts.length - 1,
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
      showPrev,
      showNext,
      notification,
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

  const deleteFromShoppingCart = () => {
    dispatch({ type: "DELETE_FROM_SHOPPING_CART" });
  };

  const goPrevPreview = (payload) => {
    dispatch({ type: "GO_PREV_PREVIEW", payload });
  };

  const goNextPreview = (payload) => {
    dispatch({ type: "GO_NEXT_PREVIEW", payload });
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
    notification,
    showPrev,
    showNext,
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
    setPriceFilter,
    setSearchedCategories,
    goPrevPreview,
    goNextPreview,
  };
}
