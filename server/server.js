/* eslint-disable no-undef */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mongoConnectHost } from "./database/connection.js";
import { authRouter } from "./routes/authRoute.js";
import { expenseRouter } from "./routes/expenseRoute.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// NOTE connection to mongoDB host
mongoConnectHost(process.env.MONGO_HOST);
app.use("/auth", authRouter);
app.use("/expense", expenseRouter);

//ANCHOR server running on port
const PORT = 8080;
app.listen(PORT, () => console.log("Server is running at : " + PORT));
