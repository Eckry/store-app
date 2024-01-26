import "./styles/Payment.css";
import useAddress from "../hooks/useAddress";
import ShippingInformation from "../components/ShippingInformation";
import Pending from "../components/Pending";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";

export default function Payment() {
  const { data } = useAddress();
  const [preferenceId, setPreferenceId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let timeId;
    fetch("https://store-app-server-qyf4.vercel.app/api")
      .then((res) => res.json())
      .then((key) => {
        initMercadoPago(key);
        return fetch("https://store-app-server-qyf4.vercel.app/api/create-preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      })
      .then((response) => response.json())
      .then((id) => {
        timeId = setTimeout(() => {
          setPreferenceId(id);
          setIsLoading(false);
          setError(false);
        }, 500);
      })
      .catch((e) => {
        setError(true);
        console.error(e);
      });
    return () => clearTimeout(timeId);
  }, []);

  return (
    <div className="confirmation-container">
      <ShippingInformation data={data} />
      <div className="shipping-container payment-container">
        <h2 className="address-title">Just one more step</h2>
        <p className="payment-text">
          This works using mercadopago api, you will be redirected to their page
          and you will put your card there, i'm going to repeating it again,
          this is NOT for buying the products you saw here, this is only for
          giving me a donation of 1 USD, if you want to do it, it would be
          awesome.
        </p>
        <div className="pending">
          <Pending error={error} isLoading={isLoading} />
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      </div>
    </div>
  );
}
