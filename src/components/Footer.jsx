import "./styles/Footer.css";
import { CiShoppingBasket } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contact-information">
        <div className="footer-icon">
          <CiShoppingBasket />
          <p>Ecommerce store</p>
        </div>
        <ul className="footer-links">
          <li>
            <Link to="/store-app/" className="footer-anchor">
              Home
            </Link>
          </li>
          <li>
            <Link to="/store-app/about" className="footer-anchor">
              About
            </Link>
          </li>
          <li>
            <Link to="/store-app/contact" className="footer-anchor">
              Contact me
            </Link>
          </li>
        </ul>
      </div>
      <hr />
      <a target="_blank" className="footer-link" href="https://github.com/Eckry/store-app">
        Source code - <FaGithub />
      </a>
    </footer>
  );
}
