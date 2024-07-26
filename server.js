require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//Local depdencies
const { PORT_NUM } = require("./utils/constants");
const { ProductRoute } = require("./routes/shopify/products/route");

//configs
app.use(express.json());
app.use(cors());

//routes
app.use("/api", ProductRoute);

app.listen(PORT_NUM, () => {
  console.log("Server connected successfully!!!");
});
