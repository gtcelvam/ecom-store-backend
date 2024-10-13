const Razorpay = require("razorpay");
const { RAZORPAY_CREDENTIALS } = require("../constants");

const razoryPayInstance = new Razorpay({
  key_id: RAZORPAY_CREDENTIALS.Id,
  key_secret: RAZORPAY_CREDENTIALS.key,
});

module.exports = razoryPayInstance;
