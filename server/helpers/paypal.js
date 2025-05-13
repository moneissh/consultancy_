const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // required: either "sandbox" or "live"
  client_id: "dummy-id", // placeholder
  client_secret: "dummy-secret", // placeholder
});

module.exports = paypal;
