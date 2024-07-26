const getSanitizedCreateProduct = (payload) => {
  return {
    title: payload?.title || "",
    body_html: payload?.body_html || "",
    vendor: payload?.vendor || "",
    variants: payload?.variants || [],
    price: payload?.price || 0,
  };
};

const getErrorMessage = (res, message = null) => {
  const response = message || "Something Went Wrong!";
  res.status(404).json({ message: response });
};

module.exports = { getSanitizedCreateProduct, getErrorMessage };
