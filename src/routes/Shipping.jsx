import useAddress from "../hooks/useAddress";
import { Link } from "react-router-dom";
import ShippingInformation from "../components/ShippingInformation";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Shipping() {
  const { data } = useAddress();
  return (
    <section className="confirmation-container">
      <ShippingInformation data={data} />
      <Link to={"/checkout/payment"} className="shipping-button">
        Next
        <span className="move-arrow">
          <FaLongArrowAltRight />
        </span>
      </Link>
    </section>
  );
}
