import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

app.use(express.json());

dotenv.config();
connectDb();

import userRoutes from "./routes/userRoutes.js";

app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Hotel management app listening on port ${port}!`)
);
