import Home from "@/pages/home/home.jsx";
import Expense from "@/pages/expense/Expense.jsx";
import Income from "@/pages/income/Income.jsx";
import HomeIndex from "@/pages/home/index.jsx";
import ExpenseIndex from "@/pages/expense/index.jsx";
import IncomeIndex from "@/pages/income/index.jsx";
import AnalysisIndex from "@/pages/analysis/index.jsx";
import ExpenseForm from "@/components/Forms/Expense_Form.jsx";
import IncomeForm from "@/components/Forms/Income_Form.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { PATH } from "./routerConfig.js";
import Analysis from "@/pages/analysis/Analysis.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PATH.home} />} />
      <Route path={PATH.home} element={<Home />}>
        <Route index element={<HomeIndex />} />
        {formRoutes()}
      </Route>
      <Route path={PATH.expense} element={<Expense />}>
        <Route index element={<ExpenseIndex />} />
        {formRoutes()}
      </Route>
      <Route path={PATH.income} element={<Income />}>
        <Route index element={<IncomeIndex />} />
        {formRoutes()}
      </Route>
      <Route path={PATH.analysis} element={<Analysis />}>
        <Route index element={<AnalysisIndex />} />
      </Route>
    </Routes>
  );
};

const formRoutes = () => (
  <>
    <Route path={PATH.addExpense} element={<ExpenseForm />} />
    <Route path={PATH.addIncome} element={<IncomeForm />} />
  </>
);

export { AppRouter };
