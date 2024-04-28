const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./Routes/userRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extented: false }));
app.use(cors());

// Routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
const url = "mongodb://127.0.0.1/QuizBot";

mongoose
  .connect(url)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to database and port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
