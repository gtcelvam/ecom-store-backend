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

const getErrorMessage = (res, message = null) => {
  const response = message || "Something Went Wrong!";
  res.status(404).json({ message: response });
};

const getSuccessMessage = (res, message = "") => {
  const response = message || "Success";
  res.status(200).json({ message: response });
};

module.exports = {
  getSanitizedCreateProduct,
  getSanitizedCreateCollection,
  getSanitizedCreateSmartCollection,
  getSanitizedAddToCollection,
  getErrorMessage,
  getSuccessMessage,
};
