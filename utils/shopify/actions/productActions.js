const shopify = require("../app");

const createProduct = async (productData) => {
  try {
    const data = await shopify.product.create(productData);
    return data;
  } catch (error) {
    console.log("CreateProduct Error : ", error);
    return new Error(error);
  }
};

const getProduct = async () => {
  try {
    const getProductData = await shopify.product.list({ limit: 10 });
    return getProductData;
  } catch (error) {
    console.log("GetProduct Error : ", error);
    return new Error(error);
  }
};

const getProductById = async (id) => {
  try {
    const productData = await shopify.product.get(id);
    return productData;
  } catch (error) {
    console.log("Get Product By Id Error : ", error);
    return new Error(error);
  }
};

const getProductListByIds = async (list) => {
  if (!Boolean(list.length)) return [];
  try {
    const productAPIList = list.map((id) => getProductById(id));
    const productListResult = await Promise.all(productAPIList);
    return productListResult;
  } catch (error) {
    console.log("Get Product List By Ids Error : ", error);
    return new Error(error);
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
  getProductById,
  getProductListByIds,
  updateProductById,
  deleteProduct,
  deleteAllProduct,
};
