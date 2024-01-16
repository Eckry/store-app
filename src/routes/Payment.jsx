import useAddress from "../hooks/useAddress";
import ShippingInformation from "../components/ShippingInformation";

export default function Payment() {
  const { data } = useAddress();
  return (  
    <>
      <ShippingInformation data={data} />
    </>
  );
}
