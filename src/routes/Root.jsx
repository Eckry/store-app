import "../App.css";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "../constants.json";
import { FaRegFaceSadCry } from "react-icons/fa6";
import Product from "../components/Product";
import useStore from "../hooks/useStore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselButtons from "../components/CarouselButtons";
import useFilters from "../hooks/useFilters";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function MainContent() {
  const { filteredProducts } = useFilters();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) - 1;

  if (!filteredProducts.length) {
    return (
      <main className="container-if-no-products">
        <FaRegFaceSadCry />
        <h1 className="empty-title">We don't have that yet</h1>
      </main>
    );
  }

  return (
    <main className="container">
      {filteredProducts
        .slice(
          NUMBER_OF_PRODUCTS_PER_PAGE * page,
          NUMBER_OF_PRODUCTS_PER_PAGE * (page + 1)
        )
        .map((product) => (
          <Product key={product.id} product={product} />
        ))}
    </main>
  );
}

export default function Root() {
  const { currentPage, setCurrentPage } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (!searchParams.get("page")) setSearchParams({ page: 1 });
  });
  return (
    <>
      <Header />
      <MainContent />
      <CarouselButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </>
  );
}
