import "./styles/Error.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { MdOutlineReportGmailerrorred } from "react-icons/md"

export default function Error() {
  return (
    <>
      <main className="error-container">
        <MdOutlineReportGmailerrorred className="error-icon"/>
        <h1 className="ups-text">Ups...</h1>
        <h2 className="error-text">This page doesn't exist</h2>
        <Link className="continue-shopping">
          <IoReturnUpBackOutline className="io-icon" />
          Continue shopping
        </Link>
      </main>
      <Footer />
    </>
  );
}
