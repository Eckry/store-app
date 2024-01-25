import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";

export default function Root() {
  return (
    <>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Outlet />
      <Footer />
    </>
  );
}
