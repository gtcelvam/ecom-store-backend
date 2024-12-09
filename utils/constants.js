const PORT_NUM = process.env.port || process.env.PORT_NUM;
const FED_BASE_URL = process.env.FED_BASE_URL;

//AUTH Tokens
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

//Shopify Configs
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_SECRET_KEY = process.env.SHOPIFY_SECRET_KEY;
const SHOPIFY_API_TOKEN = process.env.SHOPIFY_API_TOKEN;
const SHOPIFY_API_SCOPES = process.env.SHOPIFY_API_SCOPES;
const SHOPIFY_SHOP_NAME = process.env.SHOPIFY_SHOP_NAME;

//DB Configs
const DB_HOST_URL = process.env.DB_HOST_URL;
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PORT_NUM = process.env.DB_PORT_NUM;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CERTIFICATE = process.env.DB_CERTIFICATE.trim();
const DB_CON_URI = `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST_URL}:${DB_PORT_NUM}/${DB_NAME}?ssl-mode=REQUIRED`;

//OAuth Configs
const PASSPORT_SESSION_KEY = process.env.PASSPORT_SESSION_KEY;
const OAUTH_KEYS = {
  google: "google",
};

const OAUTH_CONFIGS = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
  },
};

//Netlify
const NETLIFY_END_POINT = "/.netlify/functions/api";

const RAZORPAY_CREDENTIALS = {
  Id: process.env.RAZOR_PAY_ID,
  key: process.env.RAZOR_PAY_KEY,
};

//Status Codes
const STATUS_CODES = {
  Success: {
    code: 200,
    message: "Success",
  },
  Not_Modified: {
    code: 304,
    message: "Not Modified",
  },
  Bad_Request: {
    code: 400,
    message: "Authorization Token Required",
  },
  UnAuthorized: {
    code: 401,
    message: "Unauthorized - Invalid or expired token.",
  },
  Forbidden: {
    code: 403,
    message: "Forbidden - You do not have permission to access this resource.",
  },
  Not_Found: {
    code: 404,
    message: "Not Found",
  },
};

const ACCESS_TOKEN = "access-token";

module.exports = {
  PORT_NUM,
  FED_BASE_URL,
  JWT_AUTH_TOKEN,
  SHOPIFY_API_KEY,
  SHOPIFY_SECRET_KEY,
  SHOPIFY_API_TOKEN,
  SHOPIFY_API_SCOPES,
  SHOPIFY_SHOP_NAME,
  PASSPORT_SESSION_KEY,
  DB_HOST_URL,
  DB_NAME,
  DB_USERNAME,
  DB_PORT_NUM,
  DB_PASSWORD,
  DB_CON_URI,
  DB_CERTIFICATE,
  OAUTH_KEYS,
  OAUTH_CONFIGS,
  ACCESS_TOKEN,
  NETLIFY_END_POINT,
  STATUS_CODES,
  RAZORPAY_CREDENTIALS,
};
