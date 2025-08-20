/* eslint-disable no-undef */

import {
  expenseModal,
  incomeModal,
  recurringExpModal,
} from "../models/transaction-modal.js";

/* NOTE - transactionFormController
 ** it will take the validated form data and then inject into the DB
 */

const insertExpense = async (req, res, next) => {
  try {
    const data = req.body;
    const entry = expenseModal(data);
    await entry.save();
    res.status(201).json({ message: "Expense inserted successfully!" });
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
    await entry.save();
    res
      .status(201)
      .json({ message: "Recurring Expense inserted successfully!" });
  
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Add Recurring Expense" });
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
    const data = await expenseModal.find({ userID }).sort({ onDate: -1 });
    // -1 latest transactionon top

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

export {
  insertExpense,
  insertRecurringExpense,
  insertIncome,
  fetchExpense,
  fetchRecurringExpense,
  fetchIncome,
};
