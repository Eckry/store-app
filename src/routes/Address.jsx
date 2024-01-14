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
          <input
            className="address-input"
            type="text"
            name="firstName"
            defaultValue={data.firstName}
          />
          <input
            className="address-input"
            type="text"
            name="lastName"
            defaultValue={data.lastName}
          />
        </div>
        <input
          className="address-input"
          type="text"
          name="address"
          defaultValue={data.address}
        />
        <input
          className="address-input"
          type="text"
          name="zipCode"
          defaultValue={data.zipCode}
        />
        <div className="address-wrapper">
          <input
            className="address-input"
            type="text"
            name="city"
            defaultValue={data.city}
          />
          <input
            className="address-input"
            type="text"
            name="country"
            defaultValue={data.country}
          />
        </div>
        <input
          className="address-input"
          type="tel"
          name="phone"
          defaultValue={data.phone}
        />
        <input
          className="address-input"
          type="email"
          name="email"
          defaultValue={data.emailx}
        />
      </form>
      <button className="address-button" type="submit">
        Next {"->"}
      </button>
    </div>
  );
}
