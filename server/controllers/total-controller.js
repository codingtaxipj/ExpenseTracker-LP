import { totalModal } from "../models/total-modal.js";
import moment from "moment";

/**
 * @see insertTotal - add the transaction amount in total DB
 * @see decrementTotal - subtracts the transaction amount in total DB
 * @param {object} entry - data obj of transaction used update total DB
 * @param {import('mongoose').ClientSession} session -  to be sure that db updates without error if so then whole process will fail so that data remain persistant
 * @throws {Error} Throws an error if the database update fails.
 * @see fetchTotal - fetches the total DB data
 */

export const insertTotal = async (entry, session) => {
  try {
    const {
      userID,
      isTypeExpense,
      ofAmount,
      onDate,
      primeCategory,
      subCategory,
    } = entry;

    const year = moment(onDate).year();
    const month = moment(onDate).month();

    await totalModal.updateOne(
      // 1. Find the document
      { userID, year, isTypeExpense },

      // 2. Define all the updates to perform
      {
        // Always increment the grand total
        $inc: {
          total: ofAmount,
          "monthList.$[m].total": ofAmount,
          "primeList.$[p].total": ofAmount,
          "subList.$[s].total": ofAmount,
        },
        // Only push new items to arrays if they don't already exist
        $addToSet: {
          monthList: { month, total: 0 },
          primeList: { name: primeCategory, total: 0 },
          subList: {
            primeName: primeCategory,
            subName: subCategory,
            total: 0,
          },
        },
        // If a new document is created, set these initial values
        $setOnInsert: {
          userID,
          year,
          isTypeExpense,
        },
      },

      // 3. Set the options
      {
        session,
        upsert: true, // Create the document if it doesn't exist
        arrayFilters: [
          { "m.month": month },
          { "p.name": primeCategory },
          { "s.subName": subCategory },
        ],
      }
    );

    console.log("Totals updated efficiently and correctly.");
  } catch (error) {
    console.error("Error occurred in updateTotal:", error);
    throw new Error("Failed to update total breakdown.");
  }
};

export const decrementTotal = async (entry, session) => {
  try {
    const {
      userID,
      isTypeExpense,
      ofAmount,
      onDate,
      primeCategory,
      subCategory,
    } = entry;

    const year = moment(onDate).year();
    const month = moment(onDate).month();

    await totalModal.updateOne(
      { userID, year, isTypeExpense },
      [
        {
          $set: {
            total: decrementBy("$total", ofAmount),
            "monthList.$[m].total": decrementBy(
              "$monthList.$[m].total",
              ofAmount
            ),
            "primeList.$[p].total": decrementBy(
              "$primeList.$[p].total",
              ofAmount
            ),
            "subList.$[s].total": decrementBy("$subList.$[s].total", ofAmount),
          },
        },
      ],
      {
        session,
        arrayFilters: [
          { "m.month": month },
          { "p.name": primeCategory },
          { "s.subName": subCategory },
        ],
      }
    );

    console.log("Totals Decremented efficiently and correctly.");
  } catch (error) {
    console.error("Error occurred in decrementTotal:", error);
    throw new Error("Failed to decrement total breakdown.");
  }
};

export const fetchTotal = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await totalModal.find({ userID });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Total" });
  }
};

/**
 * Creates a MongoDB aggregation expression to safely decrement a field,
 * preventing it from going below zero.
 * @method decrementBy()
 * @param {string} fieldPath - The path to the field to decrement (e.g., "$total").
 * @param {number} amountToSubtract - The amount to subtract.
 * @returns {object} The MongoDB $cond expression.
 */
const decrementBy = (fieldPath, amountToSubtract) => {
  return {
    $cond: {
      if: { $gte: [fieldPath, amountToSubtract] },
      then: { $subtract: [fieldPath, amountToSubtract] },
      else: fieldPath, // If subtraction would go negative, keep original value
    },
  };
};
