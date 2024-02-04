import { describe, it, expect, afterEach } from "vitest";
import products from "../src/products.json";
import Home from "../src/routes/Home";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { FiltersProvider } from "../src/context/FiltersContext";
import { CartProvider } from "../src/context/CartContext";
import { ThemeProvider } from "../src/context/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "../src/constants.json";

const RenderHome = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <FiltersProvider>
            <Home />
          </FiltersProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

function filterProducts(oldProducts, category){
  return oldProducts.filter(product => product.category === category);
}

describe("Everything", () => {
  afterEach(cleanup);

  it("should render initial products", () => {
    render(<RenderHome />);
    const screenProducts = screen.getAllByRole("product");
    expect(screenProducts.length).toBe(NUMBER_OF_PRODUCTS_PER_PAGE);
  });

  it("should filter products if checkbox from filters is clicked", () => {
    render(<RenderHome />);
    const showFilters = screen.getByRole("show-filters");
    expect(showFilters).toBeDefined();
    fireEvent.click(showFilters);

    const electronics = screen.getByLabelText("electronics");
    expect(electronics).toBeDefined();
    fireEvent.click(electronics);
    expect(electronics.checked).toBe(true);

    const screenProducts = screen.getAllByRole("product-title");
    expect(screenProducts).toBeDefined();
    const productsExpected = filterProducts(products, "electronics");

    screenProducts.forEach((product, idx) => {
      expect(product.textContent === productsExpected[idx].title);
    })
  });
});
