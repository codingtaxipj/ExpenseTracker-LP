import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";

import CategoryAnalysis from "@/components/analysis/CategoryAnalysis";
import YearByYearComparision from "@/components/analysis/YearByYearComparision";
import YearlyAnalysis from "@/components/analysis/expense-by-year-graph";
import AnalysisCardHeader from "@/components/analysis/AnalysisCardHeader";

const ExpenseAnalysis = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.expenseAnalysis}>
        {/*  <AnalysisCardHeader isExpense /> */}
        <YearlyAnalysis isExpense></YearlyAnalysis>
        <YearByYearComparision isExpense></YearByYearComparision>
        <CategoryAnalysis isExpense></CategoryAnalysis>
      </NavMenu>
    </>
  );
};

export default ExpenseAnalysis;
