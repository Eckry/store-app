import useAddress from "../hooks/useAddress";
import { Link } from "react-router-dom";
import ShippingInformation from "../components/ShippingInformation";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Shipping() {
  const { data } = useAddress();
  return (
    <div className="confirmation-container">
      <ShippingInformation data={data} />
      <Link to={"/store-app/checkout/payment"} className="shipping-button">
        Next <FaLongArrowAltRight />
      </Link>
    </div>
  );
}
