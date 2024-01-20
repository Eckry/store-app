import "../App.css";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "../constants.json";
import { FaRegFaceSadCry } from "react-icons/fa6";
import Product from "../components/Product";
import useStore from "../hooks/useStore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselButtons from "../components/CarouselButtons";
import useFilters from "../hooks/useFilters";

function MainContent({ currentPage }) {
  const { filteredProducts } = useFilters();

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
          NUMBER_OF_PRODUCTS_PER_PAGE * currentPage,
          NUMBER_OF_PRODUCTS_PER_PAGE * (currentPage + 1)
        )
        .map((product) => (
          <Product key={product.id} product={product} />
        ))}
    </main>
  );
}

export default function Root() {
  const { currentPage, setCurrentPage } = useStore();

  return (
    <>
      <Header />
      <MainContent currentPage={currentPage} />
      <CarouselButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </>
  );
}
