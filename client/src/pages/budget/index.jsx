import TotalCard from "@/components/cards/TotalCard";
import BudgetTable from "@/components/budget-table";
import ExpButton from "@/components/buttons/expButton";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import SectionTitle from "@/components/section/section-title";
import InfoStrip from "@/components/strips/info-strip";
import MonthlyBudgetStrip from "@/components/strips/monthly-budget-strip";
import TooltipStrip from "@/components/strips/tooltip-strip";

import UseBudgetConfig from "@/hooks/useBudgetConfig";
import UseTotalConfig from "@/hooks/useTotalConfig";

import { CurrentYear } from "@/utilities/calander-utility";
import TotalExpenseCardInyear from "@/components/cards/total-expense-card-inyear";

const BudgetIndex = () => {
  //NOTE - BUDGET CONFIG
  const { ActiveBudget, BudgetListByYear, BudgetByMonth } = UseBudgetConfig();

  const Budget = ActiveBudget?.amount ?? null;
  const BudgetList =
    BudgetListByYear?.find((l) => l.year === CurrentYear())?.budgetList ?? [];

  const BudgetListByMonth =
    BudgetByMonth?.find((l) => l.year === CurrentYear())?.list ?? [];

  //NOTE - TOTAL CONFIG
  const { getTotalExpMonthListOfYear } = UseTotalConfig();
  const MonthList = getTotalExpMonthListOfYear(CurrentYear());

  return (
    <>
      <Flexrow>
        <Flexcol className="items-center justify-center">
          <TotalExpenseCardInyear year={CurrentYear()} />
          <TotalCard
            isExpense
            color="text-budget"
            headText="Budget"
            total={Budget}
            footerText={"Your Monthly Budget"}
            date={CurrentYear()}
          ></TotalCard>
          <Flexrow className="justify-center">
            <ExpButton btnfor={"budget"} label={"Edit Budget"} />
            <ExpButton btnfor={"budget"} label={"New Budget"} />
          </Flexrow>
        </Flexcol>
        <Flexcol className="from-gradBot to-gradTop shadow-shadowBlack border-br1 rounded-lg border bg-gradient-to-t shadow-md">
          <BudgetTable list={BudgetList} />
        </Flexcol>
      </Flexrow>

      <Flexcol className="pt-20">
        <SectionTitle title="Monthly Budget Analysis" isBudget />
        <Flexrow className="flex-wrap items-center">
          <div className="flex flex-wrap gap-5">
            {MonthList.map((item) => (
              <MonthlyBudgetStrip
                isExpense
                key={item.month}
                month={item.month}
                budget={bb(BudgetListByMonth, item.month)}
                amount={item.total}
              />
            ))}
          </div>
        </Flexrow>
        <Flexrow className="text-14 items-center justify-start font-medium">
          <ExpButton label={"Check Analysis"} btnfor={"expense"} />
          <h4>For Detailed Budget Analysis</h4>
        </Flexrow>
      </Flexcol>
    </>
  );
};

export default BudgetIndex;

const bb = (a, b) => a.find((l) => l.month === b)?.budget ?? null;
