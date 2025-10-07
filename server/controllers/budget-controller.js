
import { budgetModal } from "../models/budget-modal.js";

export const setBudget = async (req, res) => {
  try {
    const { userID, year, month, amount } = req.body;

    // First, try to update an existing month in the budgetList array
    const result = await budgetModal.updateOne(
      { userID, year, "budgetList.month": month },
      { $set: { "budgetList.$.budget": amount } }
    );

    // If no document was modified, it means the month wasn't in the array.
    if (result.modifiedCount === 0) {
      // So, we push it. We use upsert:true to also create the yearly doc if it doesn't exist.
      await budgetModal.updateOne(
        { userID, year },
        { $push: { budgetList: { month, budget: amount } } },
        { upsert: true }
      );
    }

    // After the update, re-fetch the entire budget data to send back to the client
    // for a consistent optimistic update.
    const updatedBudgetData = await budgetModal
      .find({ userID })
      .sort({ year: 1 });

    return res.status(200).json(updatedBudgetData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to set budget" });
  }
};

/* NOTE - fetchBudget
 ** it will fetch the budget data of given user
 ** if no data is found then return null
 */
const fetchBudget = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await budgetModal.find({ userID }).sort({ year: 1 });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Budget" });
  }
};

export { setBudget, fetchBudget };
