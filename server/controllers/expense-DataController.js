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

const fetchExpenseData = async (req, res) => {
  try {
    const data = await expenseModal.find({ isFormExpense: true });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed Fetch Expense Data" });
  }
};

const fetchIncomeData = async (req, res) => {
  try {
    const data = await expenseModal.find({ isFormExpense: false });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed Fetch Expense Data" });
  }
};

const fetchMaxExpensePrime = async (req, res) => {
  try {
    const data = await maxExpenseModal.find({
      isExpenseCategory: true,
      isPrimeCategory: true,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed Fetch Max Prime Expense Data" });
  }
};

const fetchMaxIncomePrime = async (req, res) => {
  try {
    const data = await maxExpenseModal.find({
      isExpenseCategory: false,
      isPrimeCategory: true,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed Fetch Max Prime Expense Data" });
  }
};

const fetchMaxExpenseSub = async (req, res) => {
  try {
    const data = await maxExpenseModal.find({
      isExpenseCategory: true,
      isPrimeCategory: false,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed Fetch Max Prime Expense Data" });
  }
};

const fetchMaxIncomeSub = async (req, res) => {
  try {
    const data = await maxExpenseModal.find({
      isExpenseCategory: false,
      isPrimeCategory: false,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed Fetch Max Prime Expense Data" });
  }
};

export {
  formController,
  fetchExpenseData,
  fetchIncomeData,
  fetchMaxExpensePrime,
  fetchMaxExpenseSub,
  fetchMaxIncomePrime,
  fetchMaxIncomeSub,
  fetchAllData,
};

/* 



    **  NOTE fetching entries from Expense Database
app.get("/api/get-expenseData", async (req, res) => {
  try {
    const entries = await ExpenseModal.find(); // Fetch all entries
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});


  ); */
