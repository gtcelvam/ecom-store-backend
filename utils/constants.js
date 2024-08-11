const PORT_NUM = process.env.port || process.env.PORT_NUM;
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_SECRET_KEY = process.env.SHOPIFY_SECRET_KEY;
const SHOPIFY_API_TOKEN = process.env.SHOPIFY_API_TOKEN;
const SHOPIFY_API_SCOPES = process.env.SHOPIFY_API_SCOPES;
const SHOPIFY_SHOP_NAME = process.env.SHOPIFY_SHOP_NAME;

//Netlify
const NETLIFY_END_POINT = "/.netlify/functions/api";

module.exports = {
  PORT_NUM,
  SHOPIFY_API_KEY,
  SHOPIFY_SECRET_KEY,
  SHOPIFY_API_TOKEN,
  SHOPIFY_API_SCOPES,
  SHOPIFY_SHOP_NAME,
  NETLIFY_END_POINT,
};
