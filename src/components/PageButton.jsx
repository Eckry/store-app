import "./styles/PageButton.css";
import useFilters from "../hooks/useFilters";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "../constants.json";
import { useSearchParams } from "react-router-dom";

export default function PageButton({ children, value }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredProducts } = useFilters();
  
  let page;
  if(!searchParams.get("page")) page = 0;
  else page = Number(searchParams.get("page")) - 1;

  function handleClick(e) {
    const newPage = Number(e.target.value);
    const numberOfPages = Math.ceil(
      filteredProducts.length / NUMBER_OF_PRODUCTS_PER_PAGE
    );
    if (value === "prev") {
      if (page <= 0) return;
      return setSearchParams({ page: page });
    }
    if (value === "next") {
      if (page >= numberOfPages - 1) return;
      return setSearchParams({ page: page + 2 });
    }
    setSearchParams({ page: newPage + 1 });
  }

  return (
    <button
      value={value}
      onClick={handleClick}
      className={page === value ? "page-button-selected" : "page-button"}
    >
      {children}
    </button>
  );
}
