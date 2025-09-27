/* eslint-disable no-undef */

import {
  expenseModal,
  incomeModal,
  recurringExpModal,
} from "../models/transaction-modal.js";
import { tripModal } from "../models/trip-modal.js";

/* NOTE - transactionFormController
 ** it will take the validated form data and then inject into the DB
 */

const insertExpense = async (req, res, next) => {
  try {
    const data = req.body;
    const entry = expenseModal(data);
    await entry.save();
    res.status(201).json(entry);
    req.trnxData = entry;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Add Expense" });
  }
};

const insertRecurringExpense = async (req, res) => {
  try {
    const data = req.body;
    const entry = recurringExpModal(data);
    let msg = "Recurring Expense Created successfully!";
    const { _id } = await entry.save();
    data.ofRecurring = _id;
    if (data.isRepeatStatus === 0) {
      const entry = expenseModal(data);
      await entry.save();
      msg = "Recurring Expense Created & inserted in Expesnes successfully!";
    }
    res.status(201).json({ message: msg });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Create Recurring Expense" });
  }
};

const insertIncome = async (req, res, next) => {
  try {
    const data = req.body;
    const entry = incomeModal(data);
    await entry.save();
    res.status(201).json({ message: "Income inserted successfully!" });
    req.trnxData = entry;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Add Income" });
  }
};

const fetchExpense = async (req, res) => {
  try {
    const { userID } = req.params;
    /**
     * @param  onDate :-1 || will sort row with latest date to oldest
     */
    const data = await expenseModal.find({ userID }).sort({ onDate: -1 });

    const trip =
      data.ofTrip !== null ? await tripModal.findById(data.ofTrip) : null;
    data.ofTrip = trip;
    const reccuring =
      data.ofRecurring !== null
        ? await recurringExpModal.findById(data.ofRecurring)
        : null;
    data.ofRecurring = reccuring;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Expense Data" });
  }
};

const fetchRecurringExpense = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await recurringExpModal.find({ userID }).sort({ onDate: -1 });
    // -1 latest transactionon top

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Failed to Fetch Recurring Expense Data",
    });
  }
};

const fetchIncome = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await incomeModal.find({ userID }).sort({ onDate: -1 });
    // -1 latest transactionon top
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Income Data" });
  }
};

/**====================================================== */

const deleteExpense = async (req, res, next) => {
  try {
    const { userID, expID } = req.params;
    const expData = await expenseModal.findOneAndDelete({ userID, _id: expID });
    res.status(201).json({ message: "Expense Deleted Successfully!" });
    req.body = expData;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Delete Expense Doc" });
  }
};

const deleteIncome = async (req, res, next) => {
  try {
    const { userID, incID } = req.params;
    const incData = await incomeModal.findOneAndDelete({ userID, _id: incID });
    res.status(201).json({ message: "Income Deleted Successfully!" });
    req.body = incData;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Income Expense Doc" });
  }
};

export {
  insertExpense,
  insertRecurringExpense,
  insertIncome,
  fetchExpense,
  fetchRecurringExpense,
  fetchIncome,
  deleteExpense,
  deleteIncome,
};
