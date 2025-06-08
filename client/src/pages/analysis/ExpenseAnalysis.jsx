import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import SubCategoryMonthlyAnalysis from "@/components/analysis/SubCategoryMonthlyAnalysis";
import PrimeCategoryYearlyAnalysis from "@/components/analysis/PrimeCategoryYearlyAnalysis";
import YearByYearComparision from "@/components/analysis/YearByYearComparision";
import YearlyAnalysis from "@/components/analysis/YearlyAnalysis";

const ExpenseAnalysis = () => {
  return (
    <div>
      <NavMenu activeBtn={PATH.expenseAnalysis}>
        <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-full overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
          <>
            <YearlyAnalysis isExpense></YearlyAnalysis>
            <YearByYearComparision isExpense></YearByYearComparision>
            <PrimeCategoryYearlyAnalysis
              isExpense
            ></PrimeCategoryYearlyAnalysis>
            <SubCategoryMonthlyAnalysis isExpense></SubCategoryMonthlyAnalysis>
          </>
        </div>
      </NavMenu>
    </div>
  );
};

export default ExpenseAnalysis;
