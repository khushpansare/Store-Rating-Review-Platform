const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// CUSTOM COMPONENT
const StoreOwnerSchema = require("../models/StoreOwnerSchema");

router.get("/me", async (req, res) => {
  try {
    const token = await req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await StoreOwnerSchema.findById(decoded.id)
      .select("-password")
      .lean();

    const user_details = {
      ...user,
      isLoggedIn: true,
    };

    res.status(200).json({
      user_details: user_details,
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
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
          const user = await StoreOwnerSchema.create({
            name,
            email,
            password: hash,
            address,
            role: "Store Owner",
          });

          let token = jwt.sign(
            {
              email,
              id: user._id,
            },
            process.env.JWT_KEY
          );
          res.cookie("token", token);
          res.send({
            user_details: {
              _id: user._id,
              name: user.name,
              email: user.email,
              address: user.address,
              role: user.role,
              loggedin: true,
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
      return res.status(401).send({
        loggedIn: false,
        message: `This ${email} user not registered, please register then login.`,
      });

    bcrypt.compare(password, storeOwnerExist.password, (comperr, result) => {
      if (result) {
        let token = jwt.sign(
          {
            email,
            id: storeOwnerExist._id,
          },
          process.env.JWT_KEY
        );
        res.cookie("token", token);
        res.send({
          message: "You are logged-in",
          user_details: {
            _id: storeOwnerExist._id,
            name: storeOwnerExist.name,
            email: storeOwnerExist.email,
            address: storeOwnerExist.address,
            role: storeOwnerExist.role,
            loggedin: true,
          },
        });
      } else {
        console.log("Email or Password incoorect.");
        res
          .status(401)
          .send({ loggedIn: false, message: "Email or Password incoorect." });
      }
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict", // or "lax"
    secure: false, // true in production (https)
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
