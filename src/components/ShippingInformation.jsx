import "./styles/ShippingInformation.css";
import { Link } from "react-router-dom";

export default function ShippingInformation({ data }) {
  return (
    <div>
      <main className="shipping-container">
        <Link to={"/store-app/checkout/data"} className="shipping-button edit">
          Edit
        </Link>
        <h2 className="shipping-title">
          Check if your information is correct please.
        </h2>
        <ul className="user-data-container">
          <li className="user-data">
            Name
            <span title={`${data.firstName} ${data.lastName}`} className="user-data-title">
              {data.firstName} {data.lastName}
            </span>
          </li>
          <li className="user-data">
            Address <span title={data.address} className="user-data-title">{data.address}</span>
          </li>
          <li className="user-data">
            Zip Code <span title={data.zipcode} className="user-data-title">{data.zipCode}</span>
          </li>
          <li className="user-data">
            City <span title={data.city} className="user-data-title">{data.city}</span>
          </li>
          <li className="user-data">
            Country <span title={data.country} className="user-data-title">{data.country}</span>
          </li>
          <li className="user-data">
            Phone <span title={data.phone} className="user-data-title">{data.phone}</span>
          </li>
          <li className="user-data">
            Email <span title={data.email} className="user-data-title">{data.email}</span>
          </li>
        </ul>
      </main>
    </div>
  );
}
