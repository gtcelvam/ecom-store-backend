require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const cors = require("cors");

//Local depdencies
const { ProductRoute } = require("../routes/shopify/products/route");

//configs
app.use(express.json());
app.use(cors());

//routes
router.get("/hello", (req, res) => res.send("Hello World!"));
app.use("/.netlify/functions/api", router);
app.use("/.netlify/functions/api", ProductRoute);

module.exports.handler = serverless(app);
