import { createContext, useState } from "react";
import products from "../products.json";

export const FiltersContext = createContext(null);

export function FiltersProvider({ children }) {
  const [price, setPrice] = useState({
    min: 0,
    max: 1000,
  });
  const [searchedCategories, setSearchedCategories] = useState({});
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <FiltersContext.Provider
      value={{
        filteredProducts,
        setFilteredProducts,
        price,
        searchedCategories,
        setPrice,
        setSearchedCategories,
        query,
        setQuery,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
