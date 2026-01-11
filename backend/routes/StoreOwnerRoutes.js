const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// CUSTOM COMPONENT
const StoreOwnerSchema = require("../models/StoreOwnerSchema");

router.get("/", (req, res) => {
  res.send("Store Owner Routes Working");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const storeOwnerExist = await StoreOwnerSchema.findOne({ email: email });
    if (storeOwnerExist)
      return res
        .status(401)
        .send(
          "This email already in use. Login using same email or create new account using new email"
        );

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          res.send(err.message);
        } else {
          let user = await StoreOwnerSchema.create({
            name,
            email,
            password: hash,
            address,
            role: true,
          });

          let token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);
          res.cookie("token", token);
          res.send({
            store_owner: {
              _id: user._id,
              name: user.name,
              email: user.email,
              address: user.address,
              role: user.role,
            },
            message: "Acount created successfully.",
          });
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const storeOwnerExist = await StoreOwnerSchema.findOne({ email: email });
    if (!storeOwnerExist)
      return res
        .status(401)
        .send(`This ${email} user not registered, please register then login.`);

    bcrypt.compare(password, storeOwnerExist.password, (comperr, result) => {
      if (result) {
        let token = jwt.sign(
          { email, id: storeOwnerExist._id },
          process.env.JWT_KEY
        );
        res.cookie("token", token);
        res.send({
          message: "You are logged-in",
          store_owner: {
            _id: storeOwnerExist._id,
            name: storeOwnerExist.name,
            email: storeOwnerExist.email,
            address: storeOwnerExist.address,
            role: storeOwnerExist.role,
          },
        });
      } else {
        console.log(comperr);
        return res.send("Email or Password incoorect.");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
