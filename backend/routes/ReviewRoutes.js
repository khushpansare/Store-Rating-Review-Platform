const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// CUSTOM COMPONENT
const ReviewSchema = require("../models/ReviewSchema");
const StoreSchema = require("../models/StoreSchema");

router.get("/", async (req, res) => {
  const all_stores = await ReviewSchema.find();

  res.send({
    review_details: all_stores,
  });
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

    // To calculate average rating
    const all_reviews = await ReviewSchema.find({ store_id: store_id });
    let rating_sum = null;
    for (let i = 0; i < all_reviews.length; i++) {
      // console.log(all_reviews[i].rating);
      rating_sum += all_reviews[i].rating;
    }

    const average_rating = Math.round(rating_sum / all_reviews.length);

    const updatedStore = await StoreSchema.findByIdAndUpdate(store_id, {
      $set: { average_rating },
    });

    res.send({
      message: "Your Store added succesfully.",
      review_details: all_stores,
      updatedStore: updatedStore,
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
