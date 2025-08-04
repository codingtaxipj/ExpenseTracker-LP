import TableSection from "@/components/TableSection";
import SingleYearGraph from "@/components/analysis/Single-Year-Graph";
import ExpButton from "@/components/buttons/expButton";
import AddIncomeBtn from "@/components/buttons/text-btns/add-income-btn";
import TotalCardForMonth from "@/components/cards/total-card-for-month";
import TotalCardForYear from "@/components/cards/total-card-for-year";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import SectionTitle from "@/components/section/section-title";
import BudgetStrip from "@/components/strips/budget-strip";
import useTransactionConfig from "@/hooks/useTransactionConfig";
import { PATH } from "@/router/routerConfig";
import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";
import { useNavigate } from "react-router-dom";

const IncomeIndex = () => {
  const navigate = useNavigate();
  const { IncomeList } = useTransactionConfig();

  return (
    <>
      <Flexcol>
        <Flexrow className="items-center justify-center">
          <TotalCardForYear year={CurrentYear()} />
          <TotalCardForMonth year={CurrentYear()} month={CurrentMonth()} />
        </Flexrow>
        <Flexrow className="items-center justify-center">
          <BudgetStrip />
          <AddIncomeBtn onClick={() => navigate(PATH.addIncome)} />
        </Flexrow>
      </Flexcol>

      <Flexcol className="pt-20">
        <SectionTitle title="Income List" isIncome />
        <TableSection entries={IncomeList} />
      </Flexcol>
      <Flexcol className="pt-20">
        <SectionTitle title="Bar Graph" />
        <SingleYearGraph />
      </Flexcol>
      <Flexcol className="pt-20">
        <SectionTitle title="Top 5 Max Income Categories" isExpense />
        <Flexrow className="text-14 items-center justify-end font-medium">
          <h4>For Detailed Expense Analysis</h4>
          <ExpButton label={"Check Analysis"} btnfor={"income"} />
        </Flexrow>
      </Flexcol>
    </>
  );
};

export default IncomeIndex;
