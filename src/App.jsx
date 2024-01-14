import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import About from "./routes/About";
import Contact from "./routes/Contact";

const router = createBrowserRouter([
  {
    path: "/store-app",
    element: <Root />,
  },
  {
    path: "/store-app/about",
    element: <About />,
  },
  {
    path: "/store-app/contact",
    element: <Contact />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
