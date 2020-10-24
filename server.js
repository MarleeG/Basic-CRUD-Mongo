const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5001;
require('dotenv').config()

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fgs8h.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// dbname = basic-crud-mongo
app.listen(PORT, () => {
  console.log(`Listening on API PORT ${PORT}`);
});
