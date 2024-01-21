import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";

export default function Root() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/store-app/") navigate("/store-app/home");
  }, []);

  return (
    <>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Outlet />
      <Footer />
    </>
  );
}
