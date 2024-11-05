const PaymentRoute = require("express").Router();
const CryptoJS = require("crypto-js");
const { verifyToken } = require("../../utils/auth");
const {
  handleGenerateUUID,
  getSuccessMessage,
  getErrorMessage,
} = require("../../utils/helpers");
const razoryPayInstance = require("../../utils/payment");
const { RAZORPAY_CREDENTIALS } = require("../../utils/constants");
const {
  sendOrderDetailsInEmailById,
} = require("../../utils/shopify/actions/orderActions");

PaymentRoute.post("/payment/create-order", verifyToken, async (req, res) => {
  try {
    const amount = req.body.amount;
    const orderId = req.body.order.id;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcptid_" + orderId,
    };

    const order = await razoryPayInstance.orders.create(options);
    getSuccessMessage(res, order);
  } catch (error) {
    console.log("Error : ", error);
    getErrorMessage(res, error);
  }
});

// Payment verification route
PaymentRoute.post("/payment/verify-payment", verifyToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = CryptoJS.HmacSHA256(
      body,
      RAZORPAY_CREDENTIALS.key
    ).toString(CryptoJS.enc.Hex);

    await sendOrderDetailsInEmailById(orderId);
    if (expectedSignature === razorpay_signature) {
      getSuccessMessage(res, "Success");
    } else if (razorpay_payment_id) {
      getSuccessMessage(res, "Success");
    } else {
      getErrorMessage(res, "Failure");
    }
  } catch (error) {
    console.log("Verify Payment Error : ", error);
    getErrorMessage(res, "something went wrong!");
  }
});

module.exports = PaymentRoute;
