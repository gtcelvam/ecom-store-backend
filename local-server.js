require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//Local depdencies
const { handleDBConnection } = require("./models/db");
const { PORT_NUM } = require("./utils/constants");
const { ProductRoute } = require("./routes/shopify/products/route");
const {
  CollectionRoute,
} = require("./routes/shopify/collections/collectionRoute");
const UserRoute = require("./routes/userRoute");

//configs
app.use(express.json());
app.use(cors());

//routes
app.use("/api", ProductRoute);
app.use("/api", CollectionRoute);
app.use("/api", UserRoute);

// Start the server
app.listen(PORT_NUM, () => {
  console.log(`Server running locally on port ${PORT_NUM}`);
});
