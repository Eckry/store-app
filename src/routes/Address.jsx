import { useNavigate } from "react-router-dom";
import useAddress from "../hooks/useAddress";
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
    console.log("sss");
    updateData(newData);
    return navigate("/store-app/checkout/shipping");
  }

  return (
    <form className="address-form" onSubmit={handleSubmit}>
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
        />
      </label>
      <button className="address-button" type="submit">
        Next {"->"}
      </button>
    </form>
  );
}
