import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
    methods: ["GET", "POST"], // Allow only these HTTP methods
  })
);

// NOTE connection to mongoDB host
const makeConnection = async () =>
  await mongoose
    .connect("mongodb://127.0.0.1:27017")
    .then(console.log("Connection Formed"))
    .catch(err => console.log("Error : " + err));
makeConnection();

// ? from-database schema
const IncomeExpenseSchema = new mongoose.Schema({
  entryDate: {
    type: String,
    required: true,
  },
  formTimeStamp: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Enforce positive values
  },
  title: {
    type: String,
    required: false, // Optional field
  },
  description: {
    type: String,
    required: false, // Optional field
  },
  primeCategory: {
    type: String,
    required: true, // Enforce selection of a main category
  },
  subCategory: {
    type: String,
    required: true, // Subcategory is mandatory
  },
  userCategory: {
    type: String,
    required: false, // Optional 3rd category
  },
});

// NOTE connection to Expense Database
const connToDB_Expense = async () => {
  try {
    const db = mongoose.connection.useDb("ExpenseDatabase");
    console.log("DB Expense Connected");
    return db;
  } catch (err) {
    console.log("Error : " + err);
  }
};
const ExpenseDB = await connToDB_Expense();
const ExpenseModal = ExpenseDB.model("dataentries", IncomeExpenseSchema);
// NOTE adding entries to Expense Database
app.post("/api/expense-form-submit", async (req, res) => {
  try {
    const Data = req.body;
    const Entry = new ExpenseModal(Data);
    await Entry.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit form" });
  }
});
// NOTE fetching entries from Expense Database
app.get("/api/get-expenseData", async (req, res) => {
  try {
    const entries = await ExpenseModal.find(); // Fetch all entries
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});

// NOTE connection to Income Database
const connToDB_Income = async () => {
  try {
    const db = mongoose.connection.useDb("IncomeDatabase");
    console.log("DB Income Connected");
    return db;
  } catch (err) {
    console.log("Error : " + err);
  }
};
const IncomeDB = await connToDB_Income();
const IncomeModal = IncomeDB.model("dataentries", IncomeExpenseSchema);
// NOTE adding entries to Income Database
app.post("/api/income-form-submit", async (req, res) => {
  try {
    const Data = req.body;
    const Entry = new IncomeModal(Data);
    await Entry.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit form" });
  }
});

//ANCHOR server running on port
const PORT = 8080;
app.listen(PORT, () => console.log("Server is running at : " + PORT));
