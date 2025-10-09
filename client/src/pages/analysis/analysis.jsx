import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import ExpenseAnalysisIndex from "./expense-analysis-index";
import IncomeAnalysisIndex from "./income-analysis-index";

const Analysis = ({ isExpense, isIncome }) => {
  return (
    <>
      <NavMenu activeBtn={PATH.expenseAnalysis}>
        {isExpense && <ExpenseAnalysisIndex />}
        {isIncome && <IncomeAnalysisIndex />}
      </NavMenu>
    </>
  );
};

export default Analysis;
