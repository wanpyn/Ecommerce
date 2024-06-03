const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ShopOn");

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log(`MongoDB connection error ${error}`);
});

module.exports = mongoose;
