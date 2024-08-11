const {
  getSuccessMessage,
  getErrorMessage,
  getSanitizedCreateCollection,
  getSanitizedCreateSmartCollection,
  getSanitizedAddToCollection,
} = require("../../../utils/helpers");
const {
  createCollection,
  createSmartCollection,
  addProductToCollection,
} = require("../../../utils/shopify/actions/collectionActions");

const CollectionRoute = require("express").Router();

//Create Collection
CollectionRoute.post("/collections", async (req, res) => {
  try {
    const payload = getSanitizedCreateCollection(req.body);
    const result = await createCollection(payload);
    getSuccessMessage(res, result);
  } catch (error) {
    console.log("Collection Route Add Error : ", error);
    getErrorMessage(res);
  }
});

//Create Smart Collection
CollectionRoute.post("/smart-collections", async (req, res) => {
  try {
    const payload = getSanitizedCreateSmartCollection(req.body);
    const result = await createSmartCollection(payload);
    getSuccessMessage(res, result);
  } catch (error) {
    console.log("Smart Collection Route Add Error : ", error);
    getErrorMessage(res);
  }
});

//Add product to collection
CollectionRoute.post("/add-to-collection", async (req, res) => {
  try {
    const payload = getSanitizedAddToCollection(req.body);
    if (payload) {
      const result = await addProductToCollection(payload);
      return getSuccessMessage(res, result);
    }
    return getErrorMessage(res, "Product Id or Collection Id is missing");
  } catch (error) {
    console.log("Collection Route Add Product Error : ", error);
    getErrorMessage(res);
  }
});

module.exports = { CollectionRoute };
