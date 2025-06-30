import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import YearByYearComparision from "@/components/analysis/YearByYearComparision";
import YearlyAnalysis from "@/components/analysis/YearlyAnalysis";

import CategoryAnalysis from "@/components/analysis/CategoryAnalysis";

const IncomeAnalysis = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.incomeAnalysis}>
        {/*  <AnalysisCardHeader isExpense /> */}
        <YearlyAnalysis></YearlyAnalysis>
        <YearByYearComparision></YearByYearComparision>
        <CategoryAnalysis></CategoryAnalysis>
      </NavMenu>
    </>
  );
};

export default IncomeAnalysis;
