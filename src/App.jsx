import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import About from "./routes/About";

const router = createBrowserRouter([
  {
    path: "/store-app",
    element: <Root />,
  },
  {
    path: "/store-app/about",
    element: <About/>
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
