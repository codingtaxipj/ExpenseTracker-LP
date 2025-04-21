import { Routes, Route, Navigate } from "react-router";
import { PATH } from "./routerConfig.js";
import Home from "@/pages/home/Home.jsx";
import Expense from "@/pages/expense/Expense.jsx"
import Income from "@/pages/income/Income.jsx"
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PATH.home}/>} />
      <Route path={PATH.home} element={<Home/>}>
        <Route index element={null} />
        {formRoutes()}
      </Route>
      <Route path={PATH.expense} element={<Expense/>}>
        <Route index element={null} />
        {formRoutes()}
      </Route>
      <Route path={PATH.income} element={<Income/>}>
        <Route index element={null} />
        {formRoutes()}
      </Route>
    </Routes>
  );
};

const formRoutes = () => (
  <>
    <Route path={PATH.addExpense} element={null} />
    <Route path={PATH.addIncome} element={null} />
  </>
);

export { AppRouter };
