import "./styles/Warning.css";
import { IoIosWarning } from "react-icons/io";
import { FaLink } from "react-icons/fa";

export default function Warning() {
  return (
    <div className="warning-container">
      <IoIosWarning className="warning-icon" />
      <p className="warning-text">
        I do not sell these products, if you want to buy the actual products you
        saw here, click on the <FaLink className="warning-link"/> besides each product, whatever, if you
        continue with the payment process, you will give me a donation of $1.
      </p>
    </div>
  );
}
