const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { bookMovieSchema } = require("./schema");
const MongoUrl = process.env.URI;

mongoose
  .connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connection established with mongodb server online");
  })
  .catch((err) => {
    console.log("error while connection", err);
  });
let connection = mongoose.model("bookings", bookMovieSchema);

exports.connection = connection;
