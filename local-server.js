require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//Local depdencies
const { PORT_NUM } = require("./utils/constants");
const { ProductRoute } = require("./routes/shopify/products/route");
const {
  CollectionRoute,
} = require("./routes/shopify/collections/collectionRoute");
const UserRoute = require("./routes/userRoute");
const CartRoute = require("./routes/cartRoute");
const SQLRoute = require("./routes/sqlRoute");
const PaymentRoute = require("./routes/paymentRoute");
const OrderRoute = require("./routes/shopify/orders/orderRoute");

//configs
app.use(express.json());
app.use(cors());

//routes
app.use("/api", ProductRoute);
app.use("/api", CollectionRoute);
app.use("/api", UserRoute);
app.use("/api", CartRoute);
app.use("/api", SQLRoute);
app.use("/api", PaymentRoute);
app.use("/api", OrderRoute);

// Start the server
app.listen(PORT_NUM, () => {
  console.log(`Server running locally on port ${PORT_NUM}`);
});
