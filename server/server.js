/* eslint-disable no-undef */
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mongoConnectHost, mongoConnectDB } from "./database/connection.js";
import { authRouter } from "./routes/authRoute.js";
//import { userModal } from "./models/usersModal.js";
dotenv.config();
const app = express();
app.use(express.json());
/* app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
    methods: ["GET", "POST"], // Allow only these HTTP methods
  })
); */
app.use(cors());

// NOTE connection to mongoDB host
mongoConnectHost(process.env.MONGO_HOST);
app.use("/auth", authRouter);
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

// ? total Expense of each category database schema
const categoryTotalSchema = new mongoose.Schema({
  categoryType: {
    type: String,
    required: true,
    unique: true, // Ensures only one document per primeCategory
  },
  totalExpenseAmount: {
    type: Number,
    required: true,
    default: 0,
  },
});

// NOTE connection to Expense Database
const ExpenseDB = await mongoConnectDB("ExpenseDatabase");
const ExpenseModal = ExpenseDB.model("dataentries", IncomeExpenseSchema);
const expenseCategoryTotalModal = ExpenseDB.model(
  "each_category_max_expense",
  categoryTotalSchema
);

// NOTE adding entries to Expense Database
app.post("/api/expense-form-submit", async (req, res) => {
  try {
    const Data = req.body;
    const Entry = new ExpenseModal(Data);
    await Entry.save();

    await expenseCategoryTotalModal.findOneAndUpdate(
      { categoryType: Data.primeCategory },
      { $inc: { totalExpenseAmount: Data.amount } },
      { upsert: true, new: true }
    );
    /*  res.status(201).json({ message: "Form submitted successfully!" }); */
    res.status(201).json({
      message: "max expense in- " + Data.primeCategory + " -Category updated",
    });
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

// NOTE fetching entries from EACH_CATEGORY_MAX_EXPENSE Database
app.get("/api/get-expense-category-totalspend", async (req, res) => {
  try {
    const entries = await expenseCategoryTotalModal.find(); // Fetch all entries
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
const incomeCategoryTotalModal = ExpenseDB.model(
  "each_category_max_income",
  categoryTotalSchema
);

// NOTE adding entries to Income Database
app.post("/api/income-form-submit", async (req, res) => {
  try {
    const Data = req.body;
    const Entry = new IncomeModal(Data);
    await Entry.save();

    await incomeCategoryTotalModal.findOneAndUpdate(
      { categoryType: Data.subCategory },
      { $inc: { totalExpenseAmount: Data.amount } },
      { upsert: true, new: true }
    );
    /*  res.status(201).json({ message: "Form submitted successfully!" }); */
    res.status(201).json({
      message: "max expense in- " + Data.subCategory + " -Category updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit form" });
  }
});

// NOTE fetching entries from Income Database
app.get("/api/get-incomeData", async (req, res) => {
  try {
    const entries = await IncomeModal.find(); // Fetch all entries
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});

// NOTE fetching entries from EACH_CATEGORY_MAX_EXPENSE Database
app.get("/api/get-income-category-totalspend", async (req, res) => {
  try {
    const entries = await incomeCategoryTotalModal.find(); // Fetch all entries
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});

//ANCHOR server running on port
const PORT = 8080;
app.listen(PORT, () => console.log("Server is running at : " + PORT));
