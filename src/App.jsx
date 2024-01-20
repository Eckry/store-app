import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import About from "./routes/About";
import Contact from "./routes/Contact";
import { path } from "./constants.json";
import Checkout from "./routes/Checkout";
import Address from "./routes/Address";
import Shipping from "./routes/Shipping"
import Payment from "./routes/Payment";
import ShoppingCart from "./routes/ShoppingCart";

const router = createBrowserRouter([
  {
    path: `${path}`,
    element: <Root />,
  },
  {path: `${path}/cart`, element: <ShoppingCart />},
  {
    path: `${path}/about`,
    element: <About />,
  },
  {
    path: `${path}/contact`,
    element: <Contact />,
  },
  {
    path: `${path}/checkout`,
    element: <Checkout />,
    children: [
      { path: `${path}/checkout/data`, element: <Address /> },
      { path: `${path}/checkout/shipping`, element: <Shipping /> },
      {path: `${path}/checkout/payment`, element: <Payment />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
