import { IoIosWarning } from "react-icons/io";
import "./styles/Warning.css";

export default function Warning() {
  return (
    <div className="warning-container">
      <IoIosWarning className="warning-icon" />
      <p className="warning-text">
        I do not sell these products, if you want to buy the actual products you
        saw here, click on the ICON besides each product, whatever, if you
        continue with the payment process, you will give me a donation of $1.
      </p>
    </div>
  );
}
