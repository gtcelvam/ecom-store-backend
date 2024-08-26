const PORT_NUM = process.env.port || process.env.PORT_NUM;

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
const DB_CERTIFICATE = process.env.DB_CERTIFICATE;
const DB_CON_URI = `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST_URL}:${DB_PORT_NUM}/${DB_NAME}?ssl-mode=REQUIRED`;

//Netlify
const NETLIFY_END_POINT = "/.netlify/functions/api";

module.exports = {
  PORT_NUM,
  SHOPIFY_API_KEY,
  SHOPIFY_SECRET_KEY,
  SHOPIFY_API_TOKEN,
  SHOPIFY_API_SCOPES,
  SHOPIFY_SHOP_NAME,
  DB_HOST_URL,
  DB_NAME,
  DB_USERNAME,
  DB_PORT_NUM,
  DB_PASSWORD,
  DB_CON_URI,
  DB_CERTIFICATE,
  NETLIFY_END_POINT,
};
