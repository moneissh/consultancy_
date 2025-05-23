const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // required: either "sandbox" or "live"
  client_id: "AU7O2wwYIninIOj3NS4uKvQhpgwUpe2CckHoQPApKjwRCym4CRATJXaQqSTqbJ4ruWQUSne0kH2ymand", // placeholder
  client_secret: "EMwg0OY9YFSv0VKoSHvMD4AiaElySCVldi2aJPjz7BJ9uZcImzXpMUgKW6olVdWvDYVZFPOFNx9CsbIC", // placeholder
});

module.exports = paypal;
