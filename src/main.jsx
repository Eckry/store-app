import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FiltersProvider } from "./context/FiltersContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <FiltersProvider>
          <App />
        </FiltersProvider>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
