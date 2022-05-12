import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import path from "path";

app.use(express.json());

dotenv.config();
connectDb();

import userRoutes from "./routes/userRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Hotel management app listening on port ${port}!`)
);
