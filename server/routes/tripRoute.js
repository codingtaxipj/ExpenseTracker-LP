import express from "express";
import { fetchTrip, insertTrip } from "../controllers/trip-controller.js";
import { tripValidation } from "../middlewares/trip-validation.js";

const tripRouter = express.Router();

tripRouter.get("/get-trip/:userID", fetchTrip);

tripRouter.post(
  "/add-trip",
  tripValidation, // ✅ validate incoming trip data
  insertTrip // ✅ insert trip into DB
);

export { tripRouter };
