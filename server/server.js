/* eslint-disable no-undef */
import "dotenv/config";
import express from "express";
import cors from "cors";
import { budgetRouter } from "./routes/budgetRoute.js";
import { totalRouter } from "./routes/totalRoute.js";
import { minmaxRouter } from "./routes/minmaxRoute.js";
import { transactionRouter } from "./routes/transactionRoute.js";
import { tripRouter } from "./routes/tripRoute.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use("/transaction", transactionRouter);
app.use("/budget", budgetRouter);
app.use("/total", totalRouter);
app.use("/minmax", minmaxRouter);
app.use("/trip", tripRouter);

const StratServer = async () => {
  try {
    const PORT = 8080;
    app.listen(PORT, () => console.log("Server Running : " + PORT));
  } catch (error) {
    console.error("DB & Server Error.", error);
  }
};

StratServer();
