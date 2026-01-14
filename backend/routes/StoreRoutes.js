const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// CUSTOM COMPONENT
const StoreSchema = require("../models/StoreSchema");

router.get("/all_stores_data", async (req, res) => {
  const all_stores = await StoreSchema.find().populate("created_by");
  res.send({
    store_data: all_stores,
  });
});

router.get("/:id", async (req, res) => {
  const decoded_token = jwt.decode(req.cookies.token);

  console.log(decoded_token);
  const all_stores = await StoreSchema.find({
    created_by: decoded_token.id,
  }).populate("created_by");

  res.send({
    store_data: all_stores,
  });
});

router.post("/add", async (req, res) => {
  try {
    const {
      store_name,
      store_address,
      store_landmark,
      store_state,
      store_pincode,
      store_city,
      store_country,
    } = req.body;

    const decoded_token = jwt.decode(req.cookies.token);

    const store = await StoreSchema.create({
      store_name,
      store_address,
      store_landmark,
      store_state,
      store_pincode,
      store_city,
      store_country,
      average_rating: 0,
      created_by: decoded_token.id,
    });

    const all_stores = await StoreSchema.find({
      created_by: decoded_token.id,
    }).populate({
      path: "created_by",
      strictPopulate: false,
    });
    res.send({
      message: "Your Store added succesfully.",
      store_data: all_stores,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const decoded_token = jwt.decode(req.cookies.token);

    const storeId = req.params.id;
    const updateData = req.body;

    const updatedStore = await StoreSchema.findByIdAndUpdate(storeId, {
      $set: updateData,
    });

    const all_stores = await StoreSchema.find({
      created_by: decoded_token.id,
    }).populate("created_by");
    res.send({
      message: "Your Store updated succesfully.",
      store_data: all_stores,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const decoded_token = jwt.decode(req.cookies.token);

    const storeId = req.params.id;

    const deletedStore = await StoreSchema.findByIdAndDelete(storeId);

    const all_stores = await StoreSchema.find({
      created_by: decoded_token.id,
    }).populate("created_by");
    res.send({
      message: "Your Store deleted succesfully.",
      store_data: all_stores,
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
