import "./styles/PageButton.css";
import useFilters from "../hooks/useFilters";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "../constants.json";

export default function PageButton({
  currentPage,
  setCurrentPage,
  children,
  value,
}) {
  const { filteredProducts } = useFilters();
  function handleClick(e) {
    const numberOfPages = Math.ceil(
      filteredProducts.length / NUMBER_OF_PRODUCTS_PER_PAGE
    );
    const newPage = parseInt(e.target.value);
    if (value === "prev") {
      if (currentPage <= 0) return;
      return setCurrentPage(currentPage - 1);
    }
    if (value === "next") {
      if (currentPage >= numberOfPages - 1) return;
      return setCurrentPage(currentPage + 1);
    }
    setCurrentPage(newPage);
  }

  return (
    <button
      value={value}
      onClick={handleClick}
      className={currentPage === value ? "page-button-selected" : "page-button"}
    >
      {children}
    </button>
  );
}
