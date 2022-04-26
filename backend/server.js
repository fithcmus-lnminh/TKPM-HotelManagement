const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();
const connectDb = require("./config/db");
const User = require("./model/userModel");
const bcrypt = require("bcryptjs");

connectDb();

app.listen(port, () =>
  console.log(`Hotel management app listening on port ${port}!`)
);
