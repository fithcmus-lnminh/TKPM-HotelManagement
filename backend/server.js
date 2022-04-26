const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware").errorHandler;

connectDb();

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Hotel management app listening on port ${port}!`)
);
