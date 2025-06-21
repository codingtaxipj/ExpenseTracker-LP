import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";

import CategoryAnalysis from "@/components/analysis/CategoryAnalysis";
import YearByYearComparision from "@/components/analysis/YearByYearComparision";
import YearlyAnalysis from "@/components/analysis/YearlyAnalysis";
import AnalysisCardHeader from "@/components/analysis/AnalysisCardHeader";

const ExpenseAnalysis = () => {
  return (
    <div>
      <NavMenu activeBtn={PATH.expenseAnalysis}>
        <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover flex w-full flex-col items-center overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
          <>
            <AnalysisCardHeader isExpense />
            <YearlyAnalysis isExpense></YearlyAnalysis>
            <YearByYearComparision isExpense></YearByYearComparision>
            <CategoryAnalysis isExpense></CategoryAnalysis>
          </>
        </div>
      </NavMenu>
    </div>
  );
};

export default ExpenseAnalysis;
