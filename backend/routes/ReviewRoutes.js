const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// CUSTOM COMPONENT
const ReviewSchema = require("../models/ReviewSchema");

router.get("/", async (req, res) => {
  const all_stores = await ReviewSchema.find();

  res.send({
    review_details: all_stores,
  });
  res.send("Comment");
});

router.post("/add", async (req, res) => {
  try {
    const { rating, store_id, reviewed_by } = req.body;

    const decoded_token = jwt.decode(req.cookies.token);

    const store = await ReviewSchema.create({
      rating,
      store_id,
      reviewed_by,
    });

    const all_stores = await ReviewSchema.find();

    res.send({
      message: "Your Store added succesfully.",
      review_details: all_stores,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const storeId = req.params.id;
    const updateData = req.body;

    const updatedStore = await ReviewSchema.findByIdAndUpdate(storeId, {
      $set: updateData,
    });

    const all_stores = await ReviewSchema.find();
    res.send({
      message: "Your Store updated succesfully.",
      review_details: all_stores,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const storeId = req.params.id;

    const deletedStore = await ReviewSchema.findByIdAndDelete(storeId);

    const all_stores = await ReviewSchema.find();
    res.send({
      message: "Your Store deleted succesfully.",
      review_details: all_stores,
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
