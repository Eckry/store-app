import "./styles/ShippingInformation.css";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function ShippingInformation({ data }) {
  return (
    <main className="shipping-container">
      <header className="shipping-header">
        <h2 className="shipping-title">
          Check if your information is correct please
        </h2>
        <Link to={"/checkout/data"} className="edit">
          Edit <FaEdit />
        </Link>
      </header>
      <ul className="user-data-container">
        <li className="user-data">
          Name
          <p
            title={`${data.firstName} ${data.lastName}`}
            className="user-data-title"
          >
            {data.firstName} {data.lastName}
          </p>
        </li>
        <li className="user-data">
          Address
          <p title={data.address} className="user-data-title">
            {data.address}
          </p>
        </li>
        <li className="user-data">
          Zip Code
          <p title={data.zipcode} className="user-data-title">
            {data.zipCode}
          </p>
        </li>
        <li className="user-data">
          City
          <p title={data.city} className="user-data-title">
            {data.city}
          </p>
        </li>
        <li className="user-data">
          Country
          <p title={data.country} className="user-data-title">
            {data.country}
          </p>
        </li>
        <li className="user-data">
          Phone
          <p title={data.phone} className="user-data-title">
            {data.phone}
          </p>
        </li>
        <li className="user-data">
          Email
          <p title={data.email} className="user-data-title">
            {data.email}
          </p>
        </li>
      </ul>
    </main>
  );
}
