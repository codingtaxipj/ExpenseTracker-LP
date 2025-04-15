import { maxExpenseModal } from "../models/max-expenseModal.js";

const updateSubMax = async (req, res, next) => {
  try {
    const { amount, subCategory, isFormExpense } = req.expenseInfo;
    await maxExpenseModal.findOneAndUpdate(
      { categoryName: subCategory },
      {
        $inc: { categoryTotal: amount },
        $setOnInsert: {
          isPrimeCategory: false,
          isExpenseCategory: isFormExpense,
        },
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed update subMax" });
  }
  next();
};

const updatePrimeMax = async (req, res) => {
  try {
    const { amount, primeCategory, isFormExpense } = req.expenseInfo;
    await maxExpenseModal.findOneAndUpdate(
      { categoryName: primeCategory },
      {
        $inc: { categoryTotal: amount },
        $setOnInsert: {
          isPrimeCategory: true,
          isExpenseCategory: isFormExpense,
        },
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed update primeMax" });
  }
};

export { updateSubMax, updatePrimeMax };
