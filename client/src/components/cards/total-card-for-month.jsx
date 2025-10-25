import React from "react";
import TotalCard from "./TotalCard";

import useTotalConfig from "@/hooks/useTotalConfig";
import { getMonthName } from "@/utilities/calander-utility";
import useRecurringConfig from "@/hooks/useRecurringConfig";
import { useFilterConfig } from "@/hooks/useFilterConfig";
import moment from "moment";

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
    (isReccuring && "Monthly Recurring Expense") ||
    (isExpense && "Monthly Expense") ||
    (!isExpense && "Monthly Income");
  const Color =
    (isReccuring && "text-rep-a1") ||
    (isExpense && "text-exp-a1") ||
    (!isExpense && "text-inc-a2");
  const FooterText =
    (isReccuring && `Total expense recurring every month.`) ||
    (isExpense && `Total spending in ${getMonthName(FilterMonth, "MMMM")}`) ||
    (!isExpense && `Total earning in ${getMonthName(FilterMonth, "MMMM")}`);

  return (
    <TotalCard
      className={className}
      color={Color}
      headText={HeadText}
      total={total}
      footerText={FooterText}
      date={isReccuring ? moment().year() : FilterYear}
    />
  );
};

export default TotalCardForMonth;
