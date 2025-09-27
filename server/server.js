/* eslint-disable no-undef */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mongoConnectHost } from "./database/connection.js";
import { authRouter } from "./routes/authRoute.js";
import { budgetRouter } from "./routes/budgetRoute.js";
import { totalRouter } from "./routes/totalRoute.js";
import { minmaxRouter } from "./routes/minmaxRoute.js";
import { transactionRouter } from "./routes/transactionRoute.js";
import { tripRouter } from "./routes/tripRoute.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/transaction", transactionRouter);
app.use("/budget", budgetRouter);
app.use("/total", totalRouter);
app.use("/minmax", minmaxRouter);
app.use("/trip", tripRouter);

const StratServer = async () => {
  try {
    await mongoConnectHost(process.env.MONGO_HOST);
    console.log("Database connection successful.");
    const PORT = 8080;
    app.listen(PORT, () => console.log("Server Running : " + PORT));
  } catch (error) {
    console.error("DB & Server Error.", error);
  }
};

StratServer();
