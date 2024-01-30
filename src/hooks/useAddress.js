import { useContext } from "react";
import { AddressContext } from "../context/AddressContext";

export default function useAddress() {
  const { data, setData} = useContext(AddressContext);

  function updateData(newData) {
    setData(newData);
  }

  return { data, updateData};
}
