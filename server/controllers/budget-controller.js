import moment from "moment";
import { budgetModal } from "../models/budget-modal.js";

/* NOTE - insertBudget
 ** it will take the validated form data and then inject into the DB
 */
const insertBudget = async (req, res) => {
  try {
    const { userID, year, month, amount } = req.body;
    const doc = await budgetModal.findOne({ userID, year });

    if (!doc) {
      await budgetModal.create({
        userID,
        year: moment().year(),
        budgetList: [{ month: moment().month(), budget: amount }],
      });
      return res.status(201).json({ message: "Budget Created Successfully!" });
    } else {
      await budgetModal.updateOne(
        { userID, year },
        {
          $push: {
            budgetList: { month: month, budget: amount },
          },
        }
      );
      return res
        .status(201)
        .json({ message: "New Budget Inserted Successfully!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Failed to Create or Insert Budget!!",
    });
  }
};

/* NOTE - updateBudget
 ** it will update your current active budget with a new value
 */

const updateBudget = async (req, res) => {
  try {
    const { userID, amount, year, month } = req.body;
    const doc = await budgetModal.findOne({ userID, year });
    const monthExist = doc?.budgetList?.find(m => m.month === month);

    if (monthExist) {
      await budgetModal.updateOne(
        { userID, year },
        {
          $set: {
            "budgetList.$[b].budget": amount,
            "budgetList.$[b].updatedAt": moment(),
          },
        },
        {
          arrayFilters: [{ "b.month": month }],
        }
      );
      return res.status(201).json({ message: "Budget Updated Successfully!" });
    }
    if (!monthExist) {
      return res.status(404).json({
        message: "user and year exists but not month to update the budget",
      });
    }
    if (!doc) {
      return res
        .status(404)
        .json({ message: "No budget document found for this user and year." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Failed to Update Budget at express!!",
    });
  }
};

/* NOTE - fetchBudget
 ** it will fetch the budget data of given user
 ** if no data is found then return null
 */
const fetchBudget = async (req, res) => {
  try {
    const { userID } = req.params;
    const data = await budgetModal
      .find({ userID, year: moment().year() })
      .sort({ year: 1 });
    if (!data) return res.status(200).json(null);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Budget" });
  }
};

export { insertBudget, fetchBudget, updateBudget };
