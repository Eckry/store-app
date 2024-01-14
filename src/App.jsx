import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import About from "./routes/About";
import Contact from "./routes/Contact";
import { path } from "./constants.json";
import Checkout from "./routes/Checkout";
import Address from "./routes/Address";

const router = createBrowserRouter([
  {
    path: `${path}`,
    element: <Root />,
  },
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
    children: [{ path: `${path}/checkout/data`, element: <Address /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
