const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5001;

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("client/build"));

app.listen(PORT, err => {
    if (err){
        throw err;
    }

    console.log(`Listening on API PORT ${PORT}`)
});