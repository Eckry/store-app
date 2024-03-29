import "./styles/Footer.css";
import { CiShoppingBasket } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="contact-information">
        <div className="footer-icon">
          <CiShoppingBasket />
          <p>Ecommerce store</p>
        </div>
        <ul className="footer-links">
          <li>
            <Link to="/" className="footer-anchor">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="footer-anchor">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="footer-anchor">
              Contact me
            </Link>
          </li>
        </ul>
      </section>
      <hr />
      <a target="_blank" className="footer-link" href="https://github.com/Eckry/store-app">
        Source code - <FaGithub />
      </a>
    </footer>
  );
}
