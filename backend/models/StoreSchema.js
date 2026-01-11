const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema({
  store_name: String,
  store_address: String,
  store_landmark: String,
  store_pincode: String,
  store_city: String,
  store_state: String,
  store_country: String,
  average_rating: Number,
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoreOwnerSchema",
  },
});

module.exports = mongoose.model("StoreSchema", StoreSchema);
