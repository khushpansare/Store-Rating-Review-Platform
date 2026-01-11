const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// CUSTOM COMPONENT
const CommentSchema = require("../models/CommentSchema");

router.get("/", async (req, res) => {
  const all_stores = await CommentSchema.find();

  res.send({
    products: all_stores,
  });
  res.send("Comment");
});

router.post("/add", async (req, res) => {
  try {
    const { comment, rating, store_id } = req.body;

    const decoded_token = jwt.decode(req.cookies.token);

    const store = await CommentSchema.create({
      comment,
      rating,
      store_id,
      comment_by: decoded_token.id,
    });

    const all_stores = await CommentSchema.find();
    res.send({
      message: "Your Store added succesfully.",
      products: all_stores,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const storeId = req.params.id;
    const updateData = req.body;

    const updatedStore = await CommentSchema.findByIdAndUpdate(storeId, {
      $set: updateData,
    });

    const all_stores = await CommentSchema.find();
    res.send({
      message: "Your Store updated succesfully.",
      products: all_stores,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const storeId = req.params.id;

    const deletedStore = await CommentSchema.findByIdAndDelete(storeId);

    const all_stores = await CommentSchema.find();
    res.send({
      message: "Your Store deleted succesfully.",
      products: all_stores,
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
