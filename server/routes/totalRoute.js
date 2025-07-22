import express from "express";
import { fetchTotal } from "../controllers/total-controller.js";

const totalRouter = express.Router();

totalRouter.get("/get-total/:userID", fetchTotal);

export { totalRouter };
