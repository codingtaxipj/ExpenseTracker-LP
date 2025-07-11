/* eslint-disable no-undef */

import { transactionModal } from "../models/transaction-modal.js";

/* NOTE - transactionFormController
 ** it will take the validated form data and then inject into the DB
 */

const insertTransaction = async (req, res, next) => {
  try {
    const data = req.body;
    const entry = transactionModal(data);
    await entry.save();
    res.status(201).json({ message: "Form submitted successfully!" });
    req.trnxData = entry;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Submit Form" });
  }
};

const fetchAllData = async (req, res) => {
  try {
    const data = await transactionModal.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Fetch Data" });
  }
};

export { insertTransaction, fetchAllData };
