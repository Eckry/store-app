import { createContext, useState } from "react";

export const AddressContext = createContext(null);

export function AddressProvider({ children }) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    phone: "",
    email: "",
  });


  return (
    <AddressContext.Provider value={{ data, setData }}>
      {children}
    </AddressContext.Provider>
  );
}
