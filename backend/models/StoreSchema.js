const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  role: Boolean,
});

module.exports = mongoose.model("StoreSchema", StoreSchema);
