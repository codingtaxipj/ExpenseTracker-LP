import TotalCard from "@/components/cards/TotalCard";
import BudgetTable from "@/components/budget-table";
import ExpButton from "@/components/buttons/expButton";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";

import useBudgetConfig from "@/hooks/useBudgetConfig";

import {
  CurrentMonth,
  CurrentYear,
  getMonthName,
} from "@/utilities/calander-utility";

import TotalCardForYear from "@/components/cards/total-card-for-year";
import useTotalConfig from "@/hooks/useTotalConfig";
import SectionTitle from "@/components/section/section-title";
import MonthlyBudgetStrip from "@/components/strips/monthly-budget-strip";

const BudgetIndex = () => {
  //NOTE - BUDGET CONFIG
  const { ActiveBudget, BudgetListByYear, BudgetByMonth } = useBudgetConfig();

  const Budget = ActiveBudget?.amount ?? null;
  const BudgetList =
    BudgetListByYear?.find((l) => l.year === CurrentYear())?.budgetList ?? [];

  const BudgetListByMonth =
    BudgetByMonth?.find((l) => l.year === CurrentYear())?.list ?? [];

  //NOTE - TOTAL CONFIG
  const { getMonthListOfYear, TotalByMonth_EXP } = useTotalConfig();

  const MonthList = [
    ...(() => {
      const arr = [];
      for (let i = 0; i < 12; i++) {
        const m = getMonthListOfYear(TotalByMonth_EXP, CurrentYear()).find(
          (m) => m.month === i,
        );
        arr.push({
          month: i,
          total: m?.total ?? 0,
        });
      }
      return arr;
    })(),
  ];

  return (
    <>
      <Flexrow>
        <Flexcol className="items-center justify-center">
          <TotalCardForYear isExpense year={CurrentYear()} />
          <TotalCard
            color="text-budget"
            headText="Active Budget"
            total={Budget}
            footerText={`Budget of ${getMonthName(CurrentMonth(), "MMMM")}, ${CurrentYear()}`}
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
        <SectionTitle title="Monthly Expense On Budget Analysis" isBudget />
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
