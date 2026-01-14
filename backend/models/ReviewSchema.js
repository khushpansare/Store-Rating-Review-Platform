const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  comment: String,
  rating: Number,
  reviewed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoreSchema",
  },
});

module.exports = mongoose.model("ReviewSchema", ReviewSchema);
