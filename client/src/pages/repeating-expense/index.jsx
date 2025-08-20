
import Flexrow from "@/components/section/flexrow";
import { PATH } from "@/router/routerConfig";
import React from "react";
import { useNavigate } from "react-router-dom";
import Flexcol from "@/components/section/flexcol";
import SectionTitle from "@/components/section/section-title";
import RecurringExpenseTable from "@/components/table/recurring-expense-table";
import useRecurringConfig from "@/hooks/useRecurringConfig";
import TotalCardRecurring from "@/components/cards/total-card-recurring";
import { amountFloat } from "@/components/utilityFilter";
import { GraphTitleSquare } from "@/components/analysis/Single-Year-Graph";
import HorizontalDivider from "@/components/strips/horizontal-divider";
import SingleBarChart from "@/components/charts/SingleBarChart";
import EButton from "@/components/buttons/eButton";

const RepeatingExpenseIndex = () => {
  const navigate = useNavigate();
  const { RecurringList, rcTotal, recurringChartData } = useRecurringConfig();

  const barInfo = {
    data: recurringChartData,
    label: "Expense",
    color: "var(--color-exp)",
  };

  const chartInfo = {
    title: (
      <>
        <Flexrow className="text-16px w-max items-center gap-1.25">
          <GraphTitleSquare className={"bg-exp"} />
          <span> Bar Graph - Total Recurring Expense </span>
          <HorizontalDivider className="bg-white" />
          Rs.
          <span className={"text-exp"}>
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
      <Flexcol>
        <Flexrow className="items-center justify-center">
          <TotalCardRecurring isMonth total={rcTotal.byMonth} />
          <TotalCardRecurring total={rcTotal.byYear} />
        </Flexrow>
        <Flexrow className="items-center justify-center">
          <EButton
            isTextIcon
            addExpense
            onClick={() => navigate(PATH.addRepeatingExpense)}
          />
        </Flexrow>
      </Flexcol>
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
