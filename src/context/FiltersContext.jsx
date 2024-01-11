import { createContext, useState } from "react";

export const FiltersContext = createContext(null);

export function FiltersProvider({ children }) {
  const [price, setPrice] = useState({
    min: 0,
    max: 1000,
  });
  const [searchedCategories, setSearchedCategories] = useState({});
  
  return (
    <FiltersContext.Provider
      value={{ price, searchedCategories, setPrice, setSearchedCategories }}
    >
      {children}
    </FiltersContext.Provider>
  );
}