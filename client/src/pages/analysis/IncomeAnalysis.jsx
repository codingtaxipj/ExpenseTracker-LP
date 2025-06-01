import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import YearByYearComparision from "@/components/analysis/YearByYearComparision";
import YearlyAnalysis from "@/components/analysis/YearlyAnalysis";
import SubCategoryMonthlyAnalysis from "@/components/analysis/SubCategoryMonthlyAnalysis";

const IncomeAnalysis = () => {
  return (
    <div>
      <NavMenu activeBtn={PATH.incomeAnalysis}>
        <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-full overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
          <YearlyAnalysis isExpense={false}></YearlyAnalysis>
          <YearByYearComparision isExpense={false}></YearByYearComparision>
          <SubCategoryMonthlyAnalysis
            isExpense={false}
          ></SubCategoryMonthlyAnalysis>
        </div>
      </NavMenu>
    </div>
  );
};

export default IncomeAnalysis;
