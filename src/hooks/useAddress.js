import { useContext, useEffect } from "react";
import { AddressContext } from "../context/AddressContext";

export default function useAddress() {
  const { data, setData} = useContext(AddressContext);

  function updateData(newData) {
    localStorage.setItem("address" ,JSON.stringify(newData));
    setData(newData);
  }

  useEffect(() => {
    const oldData = localStorage.getItem("address");
    if(oldData){
      setData(JSON.parse(oldData));
    }
  }, [])

  return { data, updateData};
}
