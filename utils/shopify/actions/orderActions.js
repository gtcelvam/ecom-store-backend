const shopify = require("../app");

const createOrder = async (orderData) => {
  try {
    const data = await shopify.order.create(orderData);
    return data;
  } catch (error) {
    console.log("Create Order Error : ", error);
    throw new Error(error);
  }
};

module.exports = { createOrder };
