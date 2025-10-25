// --- React Core ---
import React, { useMemo } from "react";

// --- 3rd Party Libraries ---
import { Spinner } from "flowbite-react";

// --- App Hooks ---
import useRecurringConfig from "@/hooks/useRecurringConfig";

// --- App Components ---
import ExpButton from "@/components/buttons/exp-button";
import TotalCardForMonth from "@/components/cards/total-card-for-month";
import TotalCardForYear from "@/components/cards/total-card-for-year";
import {LinearGraphCode} from "@/components/charts/linear-graph-code";
import { Icons } from "@/components/icons";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import SectionTitle from "@/components/section/section-title";
import HorizontalDivider from "@/components/strips/horizontal-divider";
import RecurringExpenseTable from "@/components/table/recurring-expense-table";
import NewReccuringExpense from "./NewReccuringExpense";

// --- App Utilities ---
import { amountFloat } from "@/components/utilityFilter";
import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";

const ReccuringExpenseIndex = () => {
  const {
    RecurringList,
    rcTotal,
    recurringChartData,
    recurringLoading,
    recurringError,
  } = useRecurringConfig();

  const barInfo = useMemo(
    () => ({
      data: recurringChartData,
      label: "Expense",
      color: "var(--color-rep-a1)",
    }),
    [recurringChartData],
  );

  const chartInfo = useMemo(
    () => ({
      title: (
        <Flexrow className="text-16px w-max items-center gap-1.25">
          <GraphTitleSquare className={"bg-rep-a1"} />
          Bar Graph - Total Recurring Expense
          <HorizontalDivider className="bg-white" />
          Rs.
          <span className={"text-rep-a3"}>
            {amountFloat(rcTotal.byMonth + rcTotal.byYear)}
          </span>
        </Flexrow>
      ),
      subtext: `Graph of Recurring Expenses in Year by Month`,
      footertext: `Showing Total Recurring Expense of Each Month in a Year `,
    }),
    [rcTotal],
  );

  // NOTE: 1. Handle the loading state first
  if (recurringLoading) {
    // Replace with your preferred loading spinner component
    return (
      <Flexrow className="h-full items-center justify-center">
        <Spinner
          className="text-slate-a3 fill-rep-a1"
          size="lg"
          aria-label="expense page loader"
        />
      </Flexrow>
    );
  }

  // NOTE: 2. Handle the error state next
  if (recurringError) {
    return (
      <>
        <Flexrow className="h-full items-center justify-center">
          ERROR : {recurringError}
        </Flexrow>
      </>
    );
  }

  //NOTE: 3. Handle the "no data" state
  if (!RecurringList || RecurringList.length === 0) {
    // This gives the user a clear message if there's nothing to show
    return <NewReccuringExpense />;
  }

  // NOTE: 4. If all checks pass, render the main content

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
        <LinearGraphCode barInfo={barInfo} chartInfo={chartInfo} />
      </Flexcol>
    </>
  );
};

export default ReccuringExpenseIndex;
