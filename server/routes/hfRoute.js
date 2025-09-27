import express from "express";
import { GenerateTripSummary } from "../controllers/hfController.js";
const hfRouter = express.Router();

hfRouter.post("/generate-trip-summary", GenerateTripSummary);

export { hfRouter };
