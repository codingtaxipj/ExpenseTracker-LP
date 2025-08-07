import TotalCard from "@/components/cards/TotalCard";
import BudgetTable from "@/components/table/budget-table";
import ExpButton from "@/components/buttons/expButton";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";

import useBudgetConfig from "@/hooks/useBudgetConfig";

import { CurrentYear } from "@/utilities/calander-utility";

import TotalCardForYear from "@/components/cards/total-card-for-year";
import useTotalConfig from "@/hooks/useTotalConfig";
import SectionTitle from "@/components/section/section-title";
import MonthlyBudgetStrip from "@/components/strips/budget-percent-strip";
import ActiveBudgetCard from "@/components/cards/active-budget-card";
import { useState } from "react";
import SelectBar from "@/components/selectFilter/SelectBar";
import SelectCard from "@/components/selectFilter/SelectCard";
import SelectFilter from "@/components/selectFilter/SelectFilter";

import { TD, TH } from "@/components/TableSection";
import { Icons } from "@/components/icons";
import BudgetExpenseTable from "@/components/table/budget-expense-table";

const BudgetIndex = () => {
  //NOTE - TOTAL CONFIG
  const { TotalByMonth_EXP, YearsList, getMonthListOfYear } = useTotalConfig();
  //NOTE - BUDGET CONFIG
  const { getBudgetListOfYear, BudgetByMonth, createBudgetWithExpense } =
    useBudgetConfig();
  //NOTE - year state
  const [year, setYear] = useState(CurrentYear());
  //NOTE - sets the year to get the months data
  const handleYearSelector = (year) => setYear(Number(year));
  //NOTE - monthdata will be assign based on graph using for expense or income
  const MonthData = TotalByMonth_EXP;
  //NOTE - arry OBJ of each month and budget by year
  const BudgetEachMonth = getBudgetListOfYear(BudgetByMonth, year);
  //NOTE - arry OBJ of each month and expense
  const ExpenseEachMonth = getMonthListOfYear(MonthData, year);
  //NOTE - arry OBJ {id, month name, expense amount, budget ,its percent }
  const BudgetExpenseCombo = createBudgetWithExpense(
    BudgetEachMonth,
    ExpenseEachMonth,
  );

  return (
    <>
      <Flexrow>
        <Flexcol className="items-center justify-center">
          <TotalCardForYear isExpense year={CurrentYear()} />
          <ActiveBudgetCard />

          <Flexrow className="justify-center">
            <ExpButton btnfor={"budget"} label={"Edit Budget"} />
            <ExpButton btnfor={"budget"} label={"New Budget"} />
          </Flexrow>
        </Flexcol>
        <Flexcol className="from-gradBot to-gradTop shadow-shadowBlack border-br1 rounded-lg border bg-gradient-to-t shadow-md">
          {/*  <BudgetTable list={BudgetList} /> */}
        </Flexcol>
      </Flexrow>

      <Flexcol className="pt-20">
        <SectionTitle title="Monthly Expense On Budget Analysis" isBudget />
        <Flexrow>
          <SelectBar>
            <SelectCard isExpense title={"Select Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={String(CurrentYear())}
                list={YearsList}
              ></SelectFilter>
            </SelectCard>
          </SelectBar>
        </Flexrow>
        <BudgetExpenseTable data={BudgetExpenseCombo} />

        <Flexrow className="flex-wrap items-center">
          <div className="flex flex-wrap gap-5">
            {/* {MonthList.map((item) => (
              <MonthlyBudgetStrip
                isExpense
                key={item.month}
                month={item.month}
                budget={bb(BudgetListByMonth, item.month)}
                amount={item.total}
              />
            ))} */}
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
