import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";

import SingleYearGraph from "@/components/analysis/Single-Year-Graph";
import YearComparisionGraph from "@/components/analysis/Year-Comparision-Graph";
import SectionTitle from "@/components/section/section-title";
import Flexcol from "@/components/section/flexcol";
import AnalysisHeader from "@/components/analysis/Analysis-Header";
import ExpenseCategoryAnalysis from "@/components/analysis/Expense-Category-Analysis";

const ExpenseAnalysis = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.expenseAnalysis}>
        <Flexcol className="pt-20">
          <SectionTitle title="Bar Graph" isExpense />
          <SingleYearGraph isExpense isAnalysis />
        </Flexcol>
        <Flexcol className="pt-20">
          <SectionTitle title="Double Line Graph" isExpense />
          <YearComparisionGraph isExpense />
        </Flexcol>
        <Flexcol className="pt-20">
          <SectionTitle title="Expense By Category Analysis" isExpense />
          <ExpenseCategoryAnalysis />
        </Flexcol>
      </NavMenu>
    </>
  );
};

export default ExpenseAnalysis;
