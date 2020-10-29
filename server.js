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

const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fgs8h.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
      {
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.log("ERROR:: ", err);
  }
};

// connectToDB()

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

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/index.html"));
// });

// dbname = basic-crud-mongo
app.listen(PORT, () => {
  console.log(`Listening on API PORT ${PORT}`);
});
