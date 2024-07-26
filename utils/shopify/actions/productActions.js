const shopify = require("../app");

const createProduct = async (productData) => {
  try {
    const data = await shopify.product.create(productData);
    console.log("data : ", data);
    return data;
  } catch (error) {
    console.log("CreateProduct Error : ", error);
    return [];
  }
};

const getProduct = async () => {
  try {
    const getProductData = await shopify.product.list({ limit: 3 });
    return getProductData;
  } catch (error) {
    console.log("GetProduct Error : ", error);
    return [];
  }
};

module.exports = { createProduct, getProduct };
