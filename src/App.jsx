import { useState } from "react";
import "./App.css";
import { ShoppingCartIcon } from "./Components/Icons";
import { Product } from "./components/Product";
import { useEffect } from "react";
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  useEffect(() => {
    async function getProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const products = await res.json();
      setProducts(products);
    }

    async function getCategories() {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const categories = await res.json();
      let categoriesMap = {};
      for (let category of categories) {
        categoriesMap[category] = true;
      }
      setCategories(categoriesMap);
    }

    getProducts();
    getCategories();
  }, []);

  return (
    <>
      <header className="header">
        <ShoppingCartIcon />
      </header>
      <main className="container">
        <div className="grid">
          {products.map((product) => (
            <Product
              key={product.id}
              name={product.title}
              link={product.image}
              price={product.price}
            />
          ))}
        </div>
      </main>
      <div className="filters">
        <h3>Price range</h3>
        <div className="price-range-container">
          <div className="range-container">
            <input id="min" />
            <label htmlFor="min">min</label>
          </div>
          <div className="range-container">
            <input id="max" />
            <label htmlFor="max">max</label>
          </div>
        </div>
        <h3>Category</h3>
        <div>
          {Object.entries(categories).map((category, checked) => (
            <div>
              <input type="checkbox" />
              <label>{category}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
