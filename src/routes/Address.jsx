import { useNavigate } from "react-router-dom";
import useAddress from "../hooks/useAddress";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./styles/Address.css";

export default function Address() {
  const { data, updateData } = useAddress();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      address,
      zipCode,
      city,
      country,
      phone,
      email,
    } = event.target.elements;
    const newData = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      zipCode: zipCode.value,
      city: city.value,
      country: country.value,
      phone: phone.value,
      email: email.value,
    };
    updateData(newData);
    return navigate("/store-app/checkout/shipping");
  }

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <div className="address-container">
        <h3 className="address-title">Address information</h3>
        <div className="address-wrapper">
          <label htmlFor="firstName" className="form-label">
            First Name
            <input
              id="firstName"
              required
              className="address-input"
              type="text"
              name="firstName"
              defaultValue={data.firstName}
              placeholder="e.g. John"
            />
          </label>
          <label htmlFor="lastName" className="form-label">
            Last Name
            <input
              id="lastName"
              required
              className="address-input"
              type="text"
              name="lastName"
              defaultValue={data.lastName}
              placeholder="e.g. Doe"
            />
          </label>
        </div>
        <label htmlFor="address" className="form-label">
          Address
          <input
            id="address"
            required
            className="address-input"
            type="text"
            name="address"
            defaultValue={data.address}
            placeholder="e.g. 1313 E Main St, Portage"
          />
        </label>
        <label htmlFor="zipCode" className="form-label">
          Zip Code
          <input
            id="zipCode"
            required
            className="address-input"
            type="text"
            name="zipCode"
            defaultValue={data.zipCode}
            placeholder="e.g. 90210"
          />
        </label>
        <div className="address-wrapper">
          <label htmlFor="city" className="form-label">
            City
            <input
              id="city"
              required
              className="address-input"
              type="text"
              name="city"
              defaultValue={data.city}
              placeholder="e.g. Berlin"
            />
          </label>
          <label htmlFor="country" className="form-label">
            Country
            <input
              id="country"
              required
              className="address-input"
              type="text"
              name="country"
              defaultValue={data.country}
              placeholder="e.g. México"
            />
          </label>
        </div>
        <label htmlFor="phone" className="form-label">
          Phone
          <input
            id="phone"
            required
            className="address-input"
            type="tel"
            name="phone"
            defaultValue={data.phone}
            placeholder="e.g. +52 659 123 4545"
          />
        </label>
        <label htmlFor="email" className="form-label">
          Email
          <input
            id="email"
            required
            className="address-input"
            type="email"
            name="email"
            defaultValue={data.email}
            placeholder="e.g. example@gmail.com"
          />
        </label>
      </div>
      <button className="shipping-button" type="submit">
        Next <FaLongArrowAltRight />
      </button>
    </form>
  );
}
