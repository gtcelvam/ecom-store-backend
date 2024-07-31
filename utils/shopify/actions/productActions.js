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
    const getProductData = await shopify.product.list({ limit: 5 });
    return getProductData;
  } catch (error) {
    console.log("GetProduct Error : ", error);
    return [];
  }
};

const updateProductById = async (id, payload) => {
  try {
    const updateProductData = await shopify.product.update(id, payload);
    return updateProductData;
  } catch (error) {
    console.log("Update Product Error : ", error);
    throw new Error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    await shopify.product.delete(id);
    const responseData = "Data deleted successfully!";
    return responseData;
  } catch (error) {
    console.log("Delete Product Error : ", error);
    throw error;
  }
};

const deleteAllProduct = async () => {
  try {
    await shopify.product.delete("*");
    const responseData = "Data deleted successfully!";
    return responseData;
  } catch (error) {
    console.log("Delete Product Error : ", error);
    throw error;
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProductById,
  deleteProduct,
  deleteAllProduct,
};
