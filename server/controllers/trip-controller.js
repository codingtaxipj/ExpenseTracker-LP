import { tripModal } from "../models/trip-modal.js";

const insertTrip = async (req, res) => {
  try {
    const data = req.body;

    // Create a new Trip entry using your trip model
    const entry = new tripModal(data);
    await entry.save();

    // Send success response
    res.status(201).json(entry);
  } catch (error) {
    console.error("Insert Trip Error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to add Trip" });
  }
};

const fetchTrip = async (req, res) => {
  try {
    const { userID } = req.params;

    // Fetch trips for the given user, sorted by trip created date (latest first)
    const data = await tripModal.find({ userID }).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch Trip Error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to fetch Trip data" });
  }
};

export { insertTrip, fetchTrip };
