import { createContext, useState } from "react";

export const AddressContext = createContext(null);

export function AddressProvider({ children }) {
  const [data, setData] = useState(() => {
    const oldData = localStorage.getItem("address");
    if (oldData) {
      return JSON.parse(oldData);
    }
    return {
      firstName: "",
      lastName: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      phone: "",
      email: "",
    };
  });

  return (
    <AddressContext.Provider value={{ data, setData }}>
      {children}
    </AddressContext.Provider>
  );
}
