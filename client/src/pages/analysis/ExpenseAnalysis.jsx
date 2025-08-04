import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";

import SingleYearGraph from "@/components/analysis/Single-Year-Graph";

const ExpenseAnalysis = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.expenseAnalysis}>
        <SingleYearGraph isExpense></SingleYearGraph>
      </NavMenu>
    </>
  );
};

export default ExpenseAnalysis;
