/* eslint-disable no-undef */
import mongoose from "mongoose";
import {
  expenseModal,
  incomeModal,
  recurringExpModal,
} from "../models/transaction-modal.js";
import { decrementTotal, insertTotal } from "./total-controller.js";
import { updateMinMax } from "./minmax-controller.js";

/**
 * *==================== FETCH Functions ====================
 * @see fetchExpense
 * @see fetchIncome
 * @see fetchRecurringExpense
 * @param  onDate :-1 in
 * expenseModal.find().sort() || incomeModal.find().sort() || recurringExpModal.find().sort()
 * will sort row with latest date to oldest
 */

export const fetchExpense = async (req, res) => {
  try {
    const { userID } = req.params;

    const data = await expenseModal.aggregate([
      // Stage 1: Find all the expenses for the user
      { $match: { userID } },
      // Stage 2: Sort them by date, just like before
      { $sort: { onDate: -1 } },
      // Stage 3: JOIN with the 'trips' collection
      {
        $lookup: {
          from: "default-trip", // The name of the collection to join with
          localField: "ofTrip", // The field from the expense documents
          foreignField: "_id", // The field from the trip documents
          as: "tripInfo", // The name of the new array field to add
        },
      },
      // Stage 4: JOIN with the 'recurring_expenses' collection
      {
        $lookup: {
          from: "default-recurring", // Use your actual collection name
          localField: "ofRecurring",
          foreignField: "_id",
          as: "recurringInfo",
        },
      },

      // Stage 5: Clean up the output
      // $lookup returns an array. Since we only expect one match,
      // $unwind deconstructs the array to give us a single object.
      {
        $unwind: {
          path: "$tripInfo",
          preserveNullAndEmptyArrays: true, // Keep expenses that don't have a trip
        },
      },
      {
        $unwind: {
          path: "$recurringInfo",
          preserveNullAndEmptyArrays: true, // Keep expenses without a recurring rule
        },
      },

      // Stage 6 (Optional): Rename fields to match your original structure
      {
        $project: {
          // Keep all original expense fields
          userID: 1,
          isTypeExpense: 1,
          ofAmount: 1,
          isNote: 1,
          primeCategory: 1,
          subCategory: 1,
          onDate: 1,
          isTripExpense: 1,
          isRecurringExpense: 1,
          // Overwrite the original fields with the populated objects
          ofTrip: "$tripInfo",
          ofRecurring: "$recurringInfo",
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Expense Data" });
  }
};

export const fetchIncome = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await incomeModal.find({ userID }).sort({ onDate: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Income Data" });
  }
};

export const fetchRecurringExpense = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await recurringExpModal.find({ userID }).sort({ onDate: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Failed to Fetch Recurring Expense Data",
    });
  }
};

/**
 * *==================== INSERT Functions ====================
 * @see insertExpense
 * @see insertIncome
 * @see insertRecurringExpense
 */

export const insertExpense = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const validatedData = matchedData(req);
    const newExpense = new expenseModal(validatedData);
    const savedEntry = await newExpense.save({ session });

    await insertTotal(savedEntry, { session });
    await updateMinMax(savedEntry, { session });

    // If everything succeeded, commit
    await session.commitTransaction();
    res.status(201).json(savedEntry);
  } catch (error) {
    await session.abortTransaction();
    console.error(
      "An error occurred during the Insert Expense Transaction:",
      error
    );
    return res.status(500).json({
      message: error.message || "Failed to Insert Expense transaction",
    });
  } finally {
    session.endSession();
  }
};

export const insertIncome = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const validatedData = matchedData(req);
    const newIncome = new incomeModal(validatedData);
    const savedEntry = await newIncome.save({ session });
    await insertTotal(savedEntry, { session });
    await session.commitTransaction();
    res.status(201).json(savedEntry);
  } catch (error) {
    await session.abortTransaction();
    console.error(
      "An error occurred during the Insert Income Transaction:",
      error
    );
    return res.status(500).json({
      message: error.message || "Failed to Insert Income transaction",
    });
  } finally {
    session.endSession();
  }
};

export const insertRecurringExpense = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const validatedData = matchedData(req);

    // Operation 1: Create the recurring expense
    const newRecurring = new recurringExpModal(validatedData);
    const savedRecurringExpense = await newRecurring.save({ session });

    let savedExpense = null; // This will hold the new expense, if created

    // Operation 2: If PAID, create the regular expense
    if (validatedData.isReccuringStatus === 0) {
      // Assuming 0 means PAID
      const expenseData = {
        ...validatedData,
        ofRecurring: savedRecurringExpense._id,
      };
      const newExpense = new expenseModal(expenseData);
      savedExpense = await newExpense.save({ session });
    }

    // If everything succeeded, commit the transaction
    await session.commitTransaction();

    // Send a complete report back to the client
    res.status(201).json({
      newRecurringExpense: savedRecurringExpense,
      newExpense: savedExpense,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error(
      "An error occurred during the Creating Recurring transaction:",
      error
    );
    return res
      .status(500)
      .json({ message: error.message || "Failed to Create Recurring Expense" });
  } finally {
    session.endSession();
  }
};

/**
 * *==================== DELETE Functions ====================
 * @see deleteExpense
 * @see deleteIncome
 * *delete the Expense & Income from DB and return the deleted obj
 */

export const deleteExpense = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { userID, expID } = req.params;
    // --- Operation 1: Delete the expense ---
    const expData = await expenseModal.findOneAndDelete(
      { userID, _id: expID },
      { session }
    );
    // Handle "not found" inside the transaction
    if (!expData) {
      // Abort the transaction before sending the response
      await session.abortTransaction();
      return res.status(404).json({ message: "Expense not found." });
    }
    // --- Operation 2: Decrement the totals ---
    await decrementTotal(expData, { session });
    await updateMinMax(expData, { session });
    await session.commitTransaction();
    res.status(200).json(expData);
  } catch (error) {
    await session.abortTransaction();
    console.error("Delete Expense Transaction aborted:", error);
    return res.status(500).json({
      message: error.message || "Failed to Delete Expense Transaction",
    });
  } finally {
    session.endSession();
  }
};

export const deleteIncome = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { userID, incID } = req.params;
    // --- Operation 1: Delete the income ---
    const incData = await incomeModal.findOneAndDelete(
      { userID, _id: incID },
      { session }
    );
    // Handle "not found" inside the transaction
    if (!incData) {
      // Abort the transaction before sending the response
      await session.abortTransaction();
      return res.status(404).json({ message: "Income not found." });
    }
    // --- Operation 2: Decrement the totals ---
    await decrementTotal(incData, { session });
    await session.commitTransaction();
    res.status(200).json(incData);
  } catch (error) {
    await session.abortTransaction();
    console.error("Delete Income Transaction aborted:", error);
    return res.status(500).json({
      message: error.message || "Failed to Delete Income Transaction",
    });
  } finally {
    session.endSession();
  }
};
