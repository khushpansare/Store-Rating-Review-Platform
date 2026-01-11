const mongoose = require("mongoose");

const StoreOwnerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  role: Boolean,
});

module.exports = mongoose.model("StoreOwnerSchema", StoreOwnerSchema);
