import products from "../products.json";
import { useState } from "react";

export default function useFilters() {
  const [price, setPrice] = useState({
    min: 0,
    max: 1000,
  });
  const [searchedCategories, setSearchedCategories] = useState({});

  function interchangeSearchedCategories(category) {
    let newSearchedCategories = structuredClone(searchedCategories);
    if (!searchedCategories.hasOwnProperty(category))
      newSearchedCategories[category] = true;
    else newSearchedCategories[category] = !searchedCategories[category];
    setSearchedCategories(newSearchedCategories);
  }

  function getFilteredProducts(query) {
    const filterByTitle = new RegExp(query, "ig");
    const newFilteredProducts = products.filter(
      (product) =>
        product.title.match(filterByTitle) &&
        product.price >= price.min &&
        product.price <= price.max &&
        (searchedCategories[product.category] ||
          Object.keys(searchedCategories).every(
            (elem) => !searchedCategories[elem]
          ))
    );
    return newFilteredProducts;
  }

  function setPriceFilter(event, id) {
    event.preventDefault();
    const newPrice =
      id === "min"
        ? Math.min(event.target.value, price.max - 350)
        : Math.max(event.target.value, price.min + 350);
    setPrice((prevPrice) => {
      return id === "min"
        ? { min: newPrice, max: prevPrice.max }
        : { min: prevPrice.min, max: newPrice };
    });
  }

  return {
    price,
    searchedCategories,
    interchangeSearchedCategories,
    getFilteredProducts,
    setPriceFilter,
  };
}
