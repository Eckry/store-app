import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Checkout from "./routes/Checkout";
import Address from "./routes/Address";
import Shipping from "./routes/Shipping";
import Payment from "./routes/Payment";
import Cart from "./routes/Cart";
import PreviewPage from "./routes/PreviewPage";
import Root from "./routes/Root";
import useTheme from "./hooks/useTheme.js";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    children: [
      { path: `/`, element: <Home /> },
      { path: `/preview`, element: <PreviewPage /> },
      { path: `cart`, element: <Cart /> },
      {
        path: `/about`,
        element: <About />,
      },
      {
        path: `/contact`,
        element: <Contact />,
      },
      {
        path: `/checkout`,
        element: <Checkout />,
        children: [
          { path: `/checkout/data`, element: <Address /> },
          { path: `/checkout/shipping`, element: <Shipping /> },
          { path: `/checkout/payment`, element: <Payment /> },
        ],
      },
    ],
  },
]);

function App() {
  const { isLight } = useTheme();

  useEffect(() => {
    const $html = document.querySelector("html");
    if (isLight) {
      $html.classList.add("light-mode");
    } else {
      $html.classList.remove("light-mode");
    }
  }, [isLight]);
  return <RouterProvider router={router} />;
}

export default App;
