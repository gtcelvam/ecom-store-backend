require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const cors = require("cors");

//Local depdencies
const { ProductRoute } = require("../routes/shopify/products/route");
const { NETLIFY_END_POINT } = require("../utils/constants");
const {
  CollectionRoute,
} = require("../routes/shopify/collections/collectionRoute");
const UserRoute = require("../routes/userRoute");
const CartRoute = require("../routes/cartRoute");

//configs
app.use(express.json());
app.use(cors());

//routes
router.get("/hello", (req, res) => res.send("Hello World!"));
app.use(NETLIFY_END_POINT, router);
app.use(NETLIFY_END_POINT, ProductRoute);
app.use(NETLIFY_END_POINT, CollectionRoute);
app.use(NETLIFY_END_POINT, UserRoute);
app.use(NETLIFY_END_POINT, CartRoute);

module.exports.handler = serverless(app);
