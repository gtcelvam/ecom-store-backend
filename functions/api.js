require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

//Local depdencies
const { ProductRoute } = require("../routes/shopify/products/route");
const {
  NETLIFY_END_POINT,
  PASSPORT_SESSION_KEY,
} = require("../utils/constants");
const {
  CollectionRoute,
} = require("../routes/shopify/collections/collectionRoute");
const UserRoute = require("../routes/userRoute");
const CartRoute = require("../routes/cartRoute");
const PaymentRoute = require("../routes/paymentRoute");
const OrderRoute = require("../routes/shopify/orders/orderRoute");
const corsConfig = require("../utils/cors");
require("../utils/passport");

//configs
app.use(express.json());
app.use(corsConfig);

app.use(
  session({
    secret: PASSPORT_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }, // Use `true` for HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
