import { FiltersContext } from "../context/FiltersContext";
import products from "../products.json";
import { useContext, useEffect } from "react";

export default function useFilters() {
  const {
    price,
    setPrice,
    query,
    filteredProducts,
    setQuery,
    searchedCategories,
    setSearchedCategories,
    setFilteredProducts,
  } = useContext(FiltersContext);

  function interchangeSearchedCategories(category) {
    let newSearchedCategories = structuredClone(searchedCategories);
    if (!searchedCategories.hasOwnProperty(category))
      newSearchedCategories[category] = true;
    else newSearchedCategories[category] = !searchedCategories[category];
    setSearchedCategories(newSearchedCategories);
  }

  function updateFilteredProducts() {
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
    setFilteredProducts(newFilteredProducts);
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

  useEffect(() => {
    function preLoad(image) {
      const img = new Image(image);
      img.src = image;
    }

    filteredProducts.forEach((product) => {
      preLoad(product.image);
    });

    updateFilteredProducts();
  }, [price, searchedCategories, query]);

  return {
    price,
    searchedCategories,
    interchangeSearchedCategories,
    filteredProducts,
    updateFilteredProducts,
    setPriceFilter,
    query,
    setQuery,
  };
}
