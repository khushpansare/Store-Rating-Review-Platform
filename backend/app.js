const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookie_parser = require("cookie-parser");

require("dotenv").config();

// CUSTOM ROUTES
const StoreOwnerRoutes = require("./routes/StoreOwnerRoutes");
const StoreRoutes = require("./routes/StoreRoutes");
const UserRoutes = require("./routes/UserRoutes");
const CommentRoutes = require("./routes/CommentRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => {
    // console.log("database connected successfully");
  })
  .catch((err) => {
    // console.log("err", err);
  });

app.use("/store-owner", StoreOwnerRoutes);
app.use("/store", StoreRoutes);
app.use("/user", UserRoutes);
app.use("/comment", CommentRoutes);

app.get("/", (req, res) => {
  res.send("App is working");
});

app.listen(process.env.PORT);
