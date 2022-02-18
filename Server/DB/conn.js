const mongoose = require("mongoose");
const db = process.env.DB;

mongoose
  .connect(db)
  .then(() => {
    console.log("connection success");
  })
  .catch(err => {
    console.log(err);
  });
