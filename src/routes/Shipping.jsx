import useAddress from "../hooks/useAddress";
import { Link } from "react-router-dom";
import ShippingInformation from "../components/ShippingInformation";

export default function Shipping() {
  const { data } = useAddress();
  return (
    <div >
      <ShippingInformation data={data} />
      <Link to={"/store-app/checkout/payment"} className="shipping-button next">
        Next {"->"}
      </Link>
    </div>
  );
}
