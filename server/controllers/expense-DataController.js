/* eslint-disable no-undef */

import { expenseModal } from "../models/expense-DataModal.js";
import { maxExpenseModal } from "../models/max-expenseModal.js";

const formController = async (req, res, next) => {
  try {
    const data = req.body;
    const entry = expenseModal(data);
    await entry.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to Submit Form!!" });
  }
  const { amount, primeCategory, subCategory, isFormExpense } = req.body;
  req.expenseInfo = { amount, primeCategory, subCategory, isFormExpense };
  next();
};

const fetchAllData = async (req, res) => {
  try {
    const data = await expenseModal.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed Fetch All Data" });
  }
};
const fetchMaxData = async (req, res) => {
  try {
    const data = await maxExpenseModal.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed Fetch All Data" });
  }
};

export { formController, fetchAllData, fetchMaxData };
