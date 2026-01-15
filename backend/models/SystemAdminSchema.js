const mongoose = require("mongoose");

const SystemAdminSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  role: String,
});

module.exports = mongoose.model("SystemAdminSchema", SystemAdminSchema);

// "store_name": "dummy store",
// "store_address": "sainath nagar",
// "store_landmark": "near balaji icecream",
// "store_state": "Maharashtra",
// "store_pincode": 425200,
// "store_city": "Pune",
// "store_country": "India"
