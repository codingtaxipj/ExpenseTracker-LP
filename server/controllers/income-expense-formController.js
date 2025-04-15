/* eslint-disable no-undef */

import { formIncomeExpenseModal } from "../models/income-expense-formModal.js";

const formController = async (req, res, next) => {
  try {
    const data = req.body;
    const entry = formIncomeExpenseModal(data);
    await entry.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to Submit Form!!" });
  }
  const { amount, primeCategory, subCategory } = req.body;
  req.expenseInfo = { amount, primeCategory, subCategory };
  next();
};
export { formController };

/* await expenseCategoryTotalModal.findOneAndUpdate(
    { categoryType: Data.primeCategory },
    { $inc: { totalExpenseAmount: Data.amount } },
    { upsert: true, new: true }



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
