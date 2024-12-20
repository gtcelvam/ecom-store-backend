const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const getSanitizedCreateProduct = (payload) => {
  return {
    title: payload?.title.trim() || "",
    body_html: payload?.body_html.trim() || "",
    vendor: payload?.vendor.trim() || "",
    variants: payload?.variants || [],
    price: payload?.price || 0,
  };
};

const getSanitizedCreateCollection = (payload) => {
  return {
    title: payload?.title.trim() || "",
    body_html: payload?.body_html.trim() || "",
    image: payload?.image || {
      src: "https://kit8.net/wp-content/uploads/edd/2022/08/kit8net_Shopping_3D_Collection_Header.jpg",
    },
  };
};

const getSanitizedCreateSmartCollection = (payload) => {
  return {
    title: payload?.title.trim() || "",
    body_html: payload?.body_html.trim() || "",
    rules: payload?.rules || [],
    image: payload?.image || {
      src: "https://kit8.net/wp-content/uploads/edd/2022/08/kit8net_Shopping_3D_Collection_Header.jpg",
    },
  };
};

const getSanitizedAddToCollection = (payload) => {
  if (payload.product_id && payload.collection_id) {
    return payload;
  }
  return null;
};

const getErrorMessage = (res, message = null, code = 404) => {
  const response = message || "Something Went Wrong!";
  res.status(code).json({ message: response, success: false });
};

const getSuccessMessage = (res, message = "") => {
  const response = message || "Success";
  res.status(200).json({ data: response, success: true });
};

const getAuthSuccessMessage = (res, message = "", token = null) => {
  if (!token) return null;
  const response = message || "Success";
  res.status(200).json({ data: response, success: true, token });
};

const handleEncryptPassword = async (password = null) => {
  if (!password) return null;
  try {
    const saltRound = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRound);
    return encryptedPassword;
  } catch (error) {
    console.log("Handle Encrypt Password Error");
  }
};

const handleCheckPassword = async (password, encryptedPassword) => {
  const isMatching = await bcrypt.compare(password, encryptedPassword);
  return isMatching;
};

const handleGenerateUUID = () => uuidv4();

const handleDeleteMultipleKeys = (obj, keys) =>
  keys.forEach((element) => delete obj[element]);

module.exports = {
  getSanitizedCreateProduct,
  getSanitizedCreateCollection,
  getSanitizedCreateSmartCollection,
  getSanitizedAddToCollection,
  getErrorMessage,
  getSuccessMessage,
  getAuthSuccessMessage,
  handleEncryptPassword,
  handleCheckPassword,
  handleGenerateUUID,
  handleDeleteMultipleKeys,
};
