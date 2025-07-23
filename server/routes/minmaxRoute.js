import express from "express";
import { fetchMM } from "../controllers/minmax-controller.js";

const minmaxRouter = express.Router();

minmaxRouter.get("/get-data/:userID", fetchMM);

export { minmaxRouter };
