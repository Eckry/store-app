import useFilters from "../hooks/useFilters";
import PageButton from "./PageButton";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "../constants.json";
import { useSearchParams } from "react-router-dom";

export default function CarouselButtons({ currentPage, setCurrentPage }) {
  const { filteredProducts } = useFilters();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) - 1

  const numberOfPages = Math.ceil(
    filteredProducts.length / NUMBER_OF_PRODUCTS_PER_PAGE
  );

  if(page >= numberOfPages) setSearchParams({page: numberOfPages - 1});
  
  if (numberOfPages <= 0) {
    return;
  }

  return (
    <div className="carousel-buttons">
      <PageButton
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        value="prev"
      >
        <FaCaretLeft />
      </PageButton>
      {Array.from({ length: numberOfPages }).map((_, idx) => (
        <PageButton
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          value={idx}
          key={idx}
        >
          {idx + 1}
        </PageButton>
      ))}
      <PageButton
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        value="next"
      >
        <FaCaretRight />
      </PageButton>
    </div>
  );
}