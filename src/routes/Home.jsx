import "../App.css";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "../constants.json";
import { FaRegFaceSadCry } from "react-icons/fa6";
import Product from "../components/Product";
import Header from "../components/Header";
import CarouselButtons from "../components/CarouselButtons";
import useFilters from "../hooks/useFilters";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function MainContent() {
  const { filteredProducts } = useFilters();
  const [searchParams] = useSearchParams();

  let page;
  if (!searchParams.get("page")) page = 0;
  else page = Number(searchParams.get("page")) - 1;

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

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
  }, []);

  return (
    <>
      <Header />
      <MainContent />
      <CarouselButtons />
    </>
  );
}