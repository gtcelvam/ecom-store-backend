const Shopify = require("shopify-api-node");
const {
  SHOPIFY_SHOP_NAME,
  SHOPIFY_API_KEY,
  SHOPIFY_API_TOKEN,
} = require("../constants");

const shopify = Shopify({
  shopName: SHOPIFY_SHOP_NAME,
  apiKey: SHOPIFY_API_KEY,
  password: SHOPIFY_API_TOKEN,
});

module.exports = shopify;
