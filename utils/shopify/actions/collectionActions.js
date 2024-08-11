const shopify = require("../app");

const createCollection = async (collectionData) => {
  try {
    const data = await shopify.customCollection.create(collectionData);
    return data;
  } catch (error) {
    console.log("Create Collection Error : ", error);
    return new Error(error);
  }
};

const createSmartCollection = async (collectionData) => {
  try {
    const data = await shopify.smartCollection.create(collectionData);
    return data;
  } catch (error) {
    console.log("Create Smart Collection Error : ", error);
    return new Error(error);
  }
};

const addProductToCollection = async (payload) => {
  try {
    const result = await shopify.collect.create(payload);
    return result;
  } catch (error) {
    console.log("Add Product to Collection Error : ", error);
    return new Error(error);
  }
};

module.exports = {
  createCollection,
  createSmartCollection,
  addProductToCollection,
};
