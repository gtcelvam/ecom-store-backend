require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();

//Local depdencies
const { PORT_NUM, PASSPORT_SESSION_KEY } = require("./utils/constants");
const { ProductRoute } = require("./routes/shopify/products/route");
const {
  CollectionRoute,
} = require("./routes/shopify/collections/collectionRoute");
const UserRoute = require("./routes/userRoute");
const CartRoute = require("./routes/cartRoute");
const SQLRoute = require("./routes/sqlRoute");
const PaymentRoute = require("./routes/paymentRoute");
const OrderRoute = require("./routes/shopify/orders/orderRoute");
const corsConfig = require("./utils/cors");
require("./utils/passport");

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
