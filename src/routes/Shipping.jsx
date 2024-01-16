import "./styles/Shipping.css";
import useAddress from "../hooks/useAddress";
import { Link } from "react-router-dom";

export default function Shipping() {
  const { data } = useAddress();
  return (
    <div >
      <main className="shipping-container">
        <Link to={"/store-app/checkout/data"} className="shipping-button edit">
          Edit
        </Link>
        <h2 className="shipping-title">Your information</h2>
        <ul>
          <li className="user-data">
            {data.firstName} {data.lastName}
          </li>
          <li className="user-data">{data.address}</li>
          <li className="user-data">{data.zipCode}</li>
          <li className="user-data">{data.city}</li>
          <li className="user-data">{data.country}</li>
          <li className="user-data">{data.phone}</li>
          <li className="user-data">{data.email}</li>
        </ul>
      </main>
      <Link to={"/store-app/checkout/payment"} className="shipping-button next">
        Next {"->"}
      </Link>
    </div>
  );
}
