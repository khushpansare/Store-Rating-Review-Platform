const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  comment: String,
  rating: Number,
  comment_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoreSchema",
  },
});

module.exports = mongoose.model("CommentSchema", CommentSchema);
