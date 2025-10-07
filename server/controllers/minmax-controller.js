import { minmaxModal } from "../models/minmax-modal.js";
import { totalModal } from "../models/total-modal.js";
import moment from "moment";

/**
 * Recalculates and upserts the min/max document for a given year using an
 * efficient aggregation pipeline.
 * @param {object} entry - The transaction data object.
 * @param {import('mongoose').ClientSession} session - The Mongoose session for the transaction.
 */

export const updateMinMax = async (entry, session) => {
  try {
    const { userID, onDate, isTypeExpense } = entry;
    const year = moment(onDate).year();

    await totalModal
      .aggregate([
        // Stage 1: Find the single, relevant total document for the year.
        {
          $match: { userID, year, isTypeExpense },
        },

        // Stage 2: Calculate all min/max values in one go.
        {
          $project: {
            _id: 0, // Exclude the default _id field
            userID: "$userID",
            year: "$year",
            isTypeExpense: "$isTypeExpense",
            minMonth: { $min: "$monthList.total" },
            maxMonth: { $max: "$monthList.total" },
            minPrime: { $min: "$primeList.total" },
            maxPrime: { $max: "$primeList.total" },
            minSub: { $min: "$subList.total" },
            maxSub: { $max: "$subList.total" },
          },
        },

        // Stage 3: Write the result directly to the minmax collection.
        {
          $merge: {
            into: minmaxModal.collection.name, // The name of the collection to write to
            on: ["userID", "year", "isTypeExpense"], // The unique key to match on
            whenMatched: "replace", // If a doc exists, replace it
            whenNotMatched: "insert", // If not, insert a new one
          },
        },
      ])
      .session(session);

    console.log("MinMax updated efficiently.");
  } catch (err) {
    console.error("Error occurred in updateMinMax:", error);
    throw new Error("Failed to update Min/Max values.");
  }
};

export const fetchMM = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await minmaxModal.find({ userID });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Min/Max Data" });
  }
};
