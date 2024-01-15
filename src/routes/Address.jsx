import useAddress from "../hooks/useAddress";
import "./styles/Address.css";

export default function Address() {
  const { data, updateData } = useAddress();
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
  }
  return (
    <div>
      <form className="address-form" onSubmit={handleSubmit}>
        <div className="address-wrapper">
          <label htmlFor="" className="form-label">
            First Name
            <input
              className="address-input"
              type="text"
              name="firstName"
              defaultValue={data.firstName}
            />
          </label>
          <label htmlFor="" className="form-label">
            Last Name
            <input
              className="address-input"
              type="text"
              name="lastName"
              defaultValue={data.lastName}
            />
          </label>
        </div>
        <label htmlFor="" className="form-label">
          Address
          <input
            className="address-input"
            type="text"
            name="address"
            defaultValue={data.address}
          />
        </label>
        <label htmlFor="" className="form-label">
          Zip Code
          <input
            className="address-input"
            type="text"
            name="zipCode"
            defaultValue={data.zipCode}
          />
        </label>
        <div className="address-wrapper">
          <label htmlFor="" className="form-label">
            City
            <input
              className="address-input"
              type="text"
              name="city"
              defaultValue={data.city}
            />
          </label>
          <label htmlFor="" className="form-label">
            Country
            <input
              className="address-input"
              type="text"
              name="country"
              defaultValue={data.country}
            />
          </label>
        </div>
        <label htmlFor="" className="form-label">
          Phone
          <input
            className="address-input"
            type="tel"
            name="phone"
            defaultValue={data.phone}
          />
        </label>
        <label htmlFor="" className="form-label">
          Email
          <input
            className="address-input"
            type="email"
            name="email"
            defaultValue={data.emailx}
          />
        </label>
      </form>
      <button className="address-button" type="submit">
        Next {"->"}
      </button>
    </div>
  );
}
