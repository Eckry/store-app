import express from "express";
import cors from "cors";
import { MercadoPagoConfig } from "mercadopago";
import { Preference } from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const API_KEY = process.env.API_KEY

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
});

export const app = express();

app.use(express.json());
app.use(cors());

app.post("/create-preference", (req, res) => {
  const preference = new Preference(client);
  preference
    .create({
      body: {
        items: [
          {
            title: "Donation",
            unit_price: 1,
            quantity: 1,
            currency_id: "USD",
          },
        ],
        back_urls: {
          success: "https://eckry.github.io/store-app/",
          failure: "https://eckry.github.io/store-app/",
          pending: "https://eckry.github.io/store-app/",
        },
        auto_return: "approved",
        payer: {
          name: req.body.firstName,
          surname: req.body.lastName,
          email: req.body.email,
          address: {
            zip_code: req.body.zipCode,
          },
        },
      },
    })
    .then((response) => {
      res.json(response.id);
    })
    .catch((e) => console.log(e));
});

app.get("/api", (req, res) => {
  return res.json(API_KEY);
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
