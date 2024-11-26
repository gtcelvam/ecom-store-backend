const cors = require("cors");
const { FED_BASE_URL } = require("../constants");

const corsConfig = Object.freeze(
  cors({
    origin: FED_BASE_URL,
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

module.exports = corsConfig;
