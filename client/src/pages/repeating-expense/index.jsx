import Flexrow from "@/components/section/flexrow";

import React from "react";

import Flexcol from "@/components/section/flexcol";
import SectionTitle from "@/components/section/section-title";
import RecurringExpenseTable from "@/components/table/recurring-expense-table";
import useRecurringConfig from "@/hooks/useRecurringConfig";

import { amountFloat } from "@/components/utilityFilter";
import { GraphTitleSquare } from "@/components/analysis/Single-Year-Graph";
import HorizontalDivider from "@/components/strips/horizontal-divider";
import SingleBarChart from "@/components/charts/SingleBarChart";

import TotalCardForYear from "@/components/cards/total-card-for-year";
import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";
import TotalCardForMonth from "@/components/cards/total-card-for-month";
import ExpButton from "@/components/buttons/exp-button";

const RepeatingExpenseIndex = () => {
  
  const { RecurringList, rcTotal, recurringChartData } = useRecurringConfig();

  const barInfo = {
    data: recurringChartData,
    label: "Expense",
    color: "var(--color-rep-a1)",
  };

  const chartInfo = {
    title: (
      <>
        <Flexrow className="text-16px w-max items-center gap-1.25">
          <GraphTitleSquare className={"bg-rep-a1"} />
          Bar Graph - Total Recurring Expense
          <HorizontalDivider className="bg-white" />
          Rs.
          <span className={"text-rep-a3"}>
            {amountFloat(rcTotal.byMonth + rcTotal.byYear)}
          </span>
        </Flexrow>
      </>
    ),
    subtext: `Graph of Recurring Expenses in Year by Month`,
    footertext: `Showing Total Recurring Expense of Each Month in a Year `,
  };

  return (
    <>
      <Flexrow className="justify-center gap-8">
        <Flexcol className="w-max items-center justify-center gap-5">
          <TotalCardForYear isReccuring year={CurrentYear()} />
          <TotalCardForMonth
            isReccuring
            year={CurrentYear()}
            month={CurrentMonth()}
          />
        </Flexcol>
        <Flexcol className="justify-top w-max items-center gap-5">
          <ExpButton addReccuring_card />
        </Flexcol>
      </Flexrow>

      <Flexcol className="pt-20">
        <SectionTitle title="Recurring Expenses List" isExpense />
        <RecurringExpenseTable entries={RecurringList ?? []} />
      </Flexcol>

      <Flexcol className="pt-20">
        <SectionTitle title="Bar Graph" isExpense />
        <SingleBarChart
          barInfo={barInfo}
          chartInfo={chartInfo}
        ></SingleBarChart>
      </Flexcol>
    </>
  );
};

export default RepeatingExpenseIndex;
