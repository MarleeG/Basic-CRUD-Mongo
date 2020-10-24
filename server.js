const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));

mongoose.connect(
  "mongodb+srv://project-user:0xBetnXcXBHyjGy8@cluster0.fgs8h.mongodb.net/basic-crud-mongo?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// dbname = basic-crud-mongo
app.listen(PORT, () => {
  console.log(`Listening on API PORT ${PORT}`);
});
