import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FiltersProvider } from "./context/FiltersContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </React.StrictMode>
);
