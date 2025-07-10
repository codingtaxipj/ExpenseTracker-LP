const insertTotal = async (req, res) => {
  try {
    const data = req.body;
    const entry = transactionModal(data);
    await entry.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Failed to Submit Form" });
  }
  const expenseData = req.body;
  req.expenseInfo = expenseData;
  next();
};

export { insertTotal };
