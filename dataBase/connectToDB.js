const mongoose = require("mongoose");
require("dotenv").config();
let URL_DATABASE = process.env.URL_DATABASE;
const DB_NAME_MONGO_ATLAS = process.env.MONGOatlas_DB_NAME;

let connect = () => {
  const connectDB = mongoose
    .connect(URL_DATABASE, { dbName: DB_NAME_MONGO_ATLAS })
    .then(() => {
      console.log("connect to DB is successfully");
    })
    .catch((err) => console.log(err));
};

module.exports = connect;
