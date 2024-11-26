require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

//Local depdencies
const { ProductRoute } = require("../routes/shopify/products/route");
const { NETLIFY_END_POINT } = require("../utils/constants");
const {
  CollectionRoute,
} = require("../routes/shopify/collections/collectionRoute");
const UserRoute = require("../routes/userRoute");
const CartRoute = require("../routes/cartRoute");
const PaymentRoute = require("../routes/paymentRoute");
const OrderRoute = require("../routes/shopify/orders/orderRoute");
const corsConfig = require("../utils/cors");

//configs
app.use(express.json());
app.use(corsConfig);

//routes
router.get("/hello", (req, res) => res.send("Hello World!"));
app.use(NETLIFY_END_POINT, router);
app.use(NETLIFY_END_POINT, ProductRoute);
app.use(NETLIFY_END_POINT, CollectionRoute);
app.use(NETLIFY_END_POINT, UserRoute);
app.use(NETLIFY_END_POINT, CartRoute);
app.use(NETLIFY_END_POINT, PaymentRoute);
app.use(NETLIFY_END_POINT, OrderRoute);

module.exports.handler = serverless(app);
