import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import YearByYearComparision from "@/components/analysis/YearByYearComparision";
import YearlyAnalysis from "@/components/analysis/YearlyAnalysis";
import PrimeCategoryYearlyAnalysis from "@/components/analysis/PrimeCategoryYearlyAnalysis";
import SubCategoryMonthlyAnalysis from "@/components/analysis/SubCategoryMonthlyAnalysis";
import useAnalysisConfig from "@/components/analysis/useAnalysisConfig";

const ExpenseAnalysis = () => {
  const { expenseTotalConfig } = useAnalysisConfig();
  return (
    <div>
      <NavMenu activeBtn={PATH.expenseAnalysis}>
        <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-full overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
          <>
            {expenseTotalConfig.subCat.loading && <span>loading...</span>}
            {!expenseTotalConfig.subCat.loading && (
              <SubCategoryMonthlyAnalysis
                totalData={expenseTotalConfig.subCat.data}
                isExpense={true}
              ></SubCategoryMonthlyAnalysis>
            )}
          </>
        </div>
      </NavMenu>
    </div>
  );
};

export default ExpenseAnalysis;
