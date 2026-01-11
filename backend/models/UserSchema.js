const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  role: Boolean,
});

module.exports = mongoose.model("UserSchema", UserSchema);
