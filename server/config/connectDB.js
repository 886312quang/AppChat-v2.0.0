const mongoose = require("mongoose");
const bluebird = require("bluebird");

/**
 * Connect to MongoDB
 */
let connectDB = () => {
  mongoose.Promise = bluebird;

  //let URI = "mongodb://localhost:27017/ChatApp"
  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  console.log(URI);
  return mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
