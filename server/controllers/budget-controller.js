import { budgetModal } from "../models/budget-modal.js";

/* NOTE - insertBudget
 ** it will take the validated form data and then inject into the DB
 */
const insertBudget = async (req, res) => {
  try {
    const data = req.body;
    const entry = budgetModal(data);
    await entry.save();
    res.status(201).json({ message: "Budget Set Successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Set Budget!!" });
  }
};

/* NOTE - fetchBudget
 ** it will fetch the budget data of given user
 ** if no data is found then return null
 */
const fetchBudget = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await budgetModal.find({ userId }).sort({ createdAt: -1 });
    if (!data) return res.status(200).json(null);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Budget" });
  }
};

export { insertBudget, fetchBudget };
