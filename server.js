const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
require("dotenv").config();
const app = express();
const PORT = 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));
app.use(routes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fgs8h.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  ).then(() => console.log('Connected to the DB'))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Listening on API PORT ${PORT}`);
});