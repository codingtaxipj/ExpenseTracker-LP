import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";
import Flexcol from "../section/flexcol";
import Flexrow from "../section/flexrow";
import TotalCardForYear from "../cards/total-card-for-year";
import TotalCardForMonth from "../cards/total-card-for-month";
import BudgetStrip from "../strips/budget-strip";

const AnalysisHeader = ({ isExpense }) => {
  return (
    <>
      <Flexcol>
        <Flexrow className="items-center justify-center">
          <TotalCardForYear isExpense={isExpense} year={CurrentYear()} />
          <TotalCardForMonth
            isExpense={isExpense}
            year={CurrentYear()}
            month={CurrentMonth()}
          />
        </Flexrow>
      </Flexcol>
    </>
  );
};

export default AnalysisHeader;
