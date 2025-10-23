import React from "react";
import TotalCard from "./TotalCard";

import useTotalConfig from "@/hooks/useTotalConfig";
import { getMonthName } from "@/utilities/calander-utility";
import useRecurringConfig from "@/hooks/useRecurringConfig";
import { useFilterConfig } from "@/hooks/useFilterConfig";

const TotalCardForMonth = ({ isExpense, isReccuring, className }) => {
  //? ----- Total Config -----
  const { ExpenseOfMonth, IncomeOfMonth } = useTotalConfig();
  //? ----- Recurring Config -----
  const { rcTotal } = useRecurringConfig();
  //? ----- Filter Config -----
  const { currentFilter } = useFilterConfig();
  const FilterYear = Number(currentFilter.values.year);
  const FilterMonth = Number(currentFilter.values.month);

  /** ============================================================== */

  //NOTE - Card Props
  const total =
    (isReccuring && rcTotal.monthly) ??
    (isExpense && ExpenseOfMonth) ??
    (!isExpense && IncomeOfMonth);
  const HeadText =
    (isReccuring && "Monthly Recurring Exp") ||
    (isExpense && "Monthly Expense") ||
    (!isExpense && "Monthly Income");
  const Color =
    (isReccuring && "text-rep-a1") ||
    (isExpense && "text-exp-a1") ||
    (!isExpense && "text-inc-a2");
  const FooterText =
    (isReccuring && `Your Total Monthly Reccuring Expense `) ||
    (isExpense &&
      `Your Total Spending in ${getMonthName(FilterMonth, "MMMM")}`) ||
    (!isExpense &&
      `Your Total Earning in ${getMonthName(FilterMonth, "MMMM")}`);

  return (
    <TotalCard
      className={className}
      color={Color}
      headText={HeadText}
      total={total}
      footerText={FooterText}
      date={FilterYear}
    />
  );
};

export default TotalCardForMonth;
