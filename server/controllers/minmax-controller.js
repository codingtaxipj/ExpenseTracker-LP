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

    // --- Step 1: Calculate the new Min/Max values using an aggregation pipeline ---
    const aggregationResult = await totalModal
      .aggregate([
        {
          $match: { userID, year, isTypeExpense },
        },
        {
          $project: {
            _id: 0,
            userID: "$userID",
            year: "$year",
            isTypeExpense: "$isTypeExpense",

            // --- Month Min/Max ---
            maxMonth: {
              $reduce: {
                input: "$monthList",
                initialValue: { total: -1 },
                in: {
                  $cond: [
                    { $gt: ["$$this.total", "$$value.total"] },
                    "$$this",
                    "$$value",
                  ],
                },
              },
            },
            minMonth: {
              $reduce: {
                // First, filter the array to exclude items with a total of 0
                input: {
                  $filter: {
                    input: "$monthList",
                    as: "item",
                    cond: { $gt: ["$$item.total", 0] },
                  },
                },
                initialValue: { total: 9e99 },
                in: {
                  $cond: [
                    { $lt: ["$$this.total", "$$value.total"] },
                    "$$this",
                    "$$value",
                  ],
                },
              },
            },

            // --- Prime Category Min/Max ---
            maxPrime: {
              $reduce: {
                input: "$primeList",
                initialValue: { total: -1 },
                in: {
                  $cond: [
                    { $gt: ["$$this.total", "$$value.total"] },
                    "$$this",
                    "$$value",
                  ],
                },
              },
            },
            minPrime: {
              $reduce: {
                // Apply the same filter logic here
                input: {
                  $filter: {
                    input: "$primeList",
                    as: "item",
                    cond: { $gt: ["$$item.total", 0] },
                  },
                },
                initialValue: { total: 9e99 },
                in: {
                  $cond: [
                    { $lt: ["$$this.total", "$$value.total"] },
                    "$$this",
                    "$$value",
                  ],
                },
              },
            },

            // --- Sub Category Min/Max ---
            maxSub: {
              $reduce: {
                input: "$subList",
                initialValue: { total: -1 },
                in: {
                  $cond: [
                    { $gt: ["$$this.total", "$$value.total"] },
                    "$$this",
                    "$$value",
                  ],
                },
              },
            },
            minSub: {
              $reduce: {
                // And apply the same filter logic here
                input: {
                  $filter: {
                    input: "$subList",
                    as: "item",
                    cond: { $gt: ["$$item.total", 0] },
                  },
                },
                initialValue: { total: 9e99 },
                in: {
                  $cond: [
                    { $lt: ["$$this.total", "$$value.total"] },
                    "$$this",
                    "$$value",
                  ],
                },
              },
            },
          },
        },
      ])
      .session(session);

    const newMinMaxDoc = aggregationResult[0];

    if (newMinMaxDoc) {
      // --- Step 2: Clean up any fields that resulted in a zero total ---
      const fieldsToClean = [
        "minMonth",
        "maxMonth",
        "minPrime",
        "maxPrime",
        "minSub",
        "maxSub",
      ];

      for (const field of fieldsToClean) {
        // If a field exists and its total is 0 or less, delete it.
        if (newMinMaxDoc[field] && newMinMaxDoc[field].total <= 0) {
          delete newMinMaxDoc[field];
        }
      }

      // --- Step 3: Save the cleaned result ---
      await minmaxModal.findOneAndUpdate(
        { userID, year, isTypeExpense },
        newMinMaxDoc,
        {
          upsert: true,
          session,
        }
      );
    }

    console.log("MinMax updated efficiently.");
  } catch (error) {
    console.error("Error occurred in updateMinMax:", error);
    throw new Error("Failed to update Min/Max values.");
  }
};

export const fetchMM = async (req, res) => {
  try {
    let { userID } = req.params;
    userID = parseInt(userID, 10);
    if (isNaN(userID)) {
      return res
        .status(400)
        .json({ message: "Invalid userID format. Must be a number." });
    }
    const data = await minmaxModal.find({ userID });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Min/Max Data" });
  }
};
