const ProductRoute = require("express").Router();
const {
  getSanitizedCreateProduct,
  getErrorMessage,
  getSuccessMessage,
} = require("../../../utils/helpers");
const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProductById,
  deleteAllProduct,
  getProductById,
  getProductsBySearch,
} = require("../../../utils/shopify/actions/productActions");

//create product
ProductRoute.post("/products", async (req, res) => {
  try {
    const payload = getSanitizedCreateProduct(req.body);
    const result = await createProduct(payload);
    getSuccessMessage(res, result);
  } catch (error) {
    console.log("Product Route Add Error : ", error);
    getErrorMessage(res);
  }
});

ProductRoute.get("/products/search/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const result = await getProductsBySearch(keyword);
    getSuccessMessage(res, result);
  } catch (error) {
    console.log("Product By Search Route Get Error : ", error);
    getErrorMessage(res, error);
  }
});

//get product
ProductRoute.get("/products", async (req, res) => {
  try {
    const result = await getProduct();
    getSuccessMessage(res, result);
  } catch (error) {
    console.log("Product Route Get Error : ", error);
    getErrorMessage(res);
  }
});

//get product by id
ProductRoute.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getProductById(id);
    getSuccessMessage(res, result);
  } catch (error) {
    console.log("Product By Id Route Get Error : ", error);
    getErrorMessage(res, error);
  }
});

//update product
ProductRoute.patch("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await updateProductById(id, req.body);
    getSuccessMessage(res, result);
  } catch (error) {
    console.log("Update Product Error : ", error);
    getErrorMessage(res, "Error From Update Product");
  }
});

//delete product
ProductRoute.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteProduct(id);
    getSuccessMessage(res, result);
  } catch (error) {
    console.log("Product Route Delete Error : ", error);
    getErrorMessage(res);
  }
});

//delete all product
ProductRoute.delete("/products/all", async (req, res) => {
  try {
    const result = await deleteAllProduct();
    getSuccessMessage(res, result);
  } catch (error) {
    console.log("Product Route Delete All Error : ", error);
    getErrorMessage(res);
  }
});

module.exports = { ProductRoute };
