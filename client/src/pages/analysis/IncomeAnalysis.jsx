import AnalysisHeader from "@/components/analysis/Analysis-Header";
import IncomeCategoryAnalysis from "@/components/analysis/Income-Category-Analysis";
import SingleYearGraph from "@/components/analysis/Single-Year-Graph";
import YearComparisionGraph from "@/components/analysis/Year-Comparision-Graph";
import NavMenu from "@/components/Navigation/NavMenu";
import Flexcol from "@/components/section/flexcol";
import SectionTitle from "@/components/section/section-title";
import { PATH } from "@/router/routerConfig";

const IncomeAnalysis = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.incomeAnalysis}>
        <Flexcol className="pt-20">
          <SectionTitle title="Bar Graph" isExpense />
          <SingleYearGraph isAnalysis />
        </Flexcol>
        <Flexcol className="pt-20">
          <SectionTitle title="Double Line Graph" isExpense />
          <YearComparisionGraph />
        </Flexcol>
        <Flexcol className="pt-20">
          <SectionTitle title="Income Analysis By Category" isExpense />
          <IncomeCategoryAnalysis />
        </Flexcol>
      </NavMenu>
    </>
  );
};

export default IncomeAnalysis;
