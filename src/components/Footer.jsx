import "./styles/Footer.css";
import { CiShoppingBasket } from "react-icons/ci";

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
            <a href="" className="footer-anchor">
              Home
            </a>
          </li>
          <li>
            <a href="" className="footer-anchor">
              About
            </a>
          </li>
          <li>
            <a href="" className="footer-anchor">
              Contact me
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <p className="footer-copyright">
        © 2023{" "}
        <a
          href="https://github.com/Eckry"
          target="_blank"
          className="footer-copyright-anchor"
        >
          Erick Torres Aguirre
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
}
