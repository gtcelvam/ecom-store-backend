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

const getOrderDetailsByEmail = async (email, limit = 10) => {
  try {
    const data = await shopify.order.list({
      email,
      status: "any",
      limit,
      fields: "id,email,line_items,total_price,created_at",
    });
    return data;
  } catch (error) {
    console.log("Get Order Details By Email Error : ", error);
    throw new Error(error);
  }
};

module.exports = { createOrder, getOrderDetailsByEmail };
