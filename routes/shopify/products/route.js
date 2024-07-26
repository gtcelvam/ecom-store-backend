const ProductRoute = require("express").Router();
const {
  getSanitizedCreateProduct,
  getErrorMessage,
} = require("../../../utils/helpers");
const {
  createProduct,
  getProduct,
} = require("../../../utils/shopify/actions/productActions");

//create product
ProductRoute.post("/products", async (req, res) => {
  try {
    const payload = getSanitizedCreateProduct(req.body);
    const result = await createProduct(payload);
    res.status(200).json(result);
  } catch (error) {
    console.log("Product Route Error : ", error);
    getErrorMessage(res);
  }
});

//get product
ProductRoute.get("/products", async (req, res) => {
  try {
    const result = await getProduct();
    res.status(200).json(result);
  } catch (error) {
    console.log("Product Route Error : ", error);
    getErrorMessage(res);
  }
});

module.exports = { ProductRoute };
