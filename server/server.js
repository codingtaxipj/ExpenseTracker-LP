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

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use(express.json());

// NOTE connection to mongoDB host
mongoConnectHost(process.env.MONGO_HOST);
app.use("/auth", authRouter);
app.use("/transaction", transactionRouter);
app.use("/budget", budgetRouter);
app.use("/total", totalRouter);
app.use("/minmax", minmaxRouter);

//ANCHOR server running on port
const PORT = 8080;
app.listen(PORT, () => console.log("Server is running at : " + PORT));
