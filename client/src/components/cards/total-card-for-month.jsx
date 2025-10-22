import React from "react";
import TotalCard from "./TotalCard";

import useTotalConfig from "@/hooks/useTotalConfig";
import { getMonthName } from "@/utilities/calander-utility";
import useRecurringConfig from "@/hooks/useRecurringConfig";
import { useFilterConfig } from "@/hooks/useFilterConfig";

const TotalCardForMonth = ({ isExpense, isReccuring, className }) => {
  //NOTE - TOTAL Exp and Inc CONFIG
  const { TotalByMonth_EXP, TotalByMonth_INC, getTotalInMonthOfYear } =
    useTotalConfig();

  //NOTE - TOTAL Reccuring Exp CONFIG
  const { rcTotal } = useRecurringConfig();
  const { currentFilter } = useFilterConfig();
  const FilterYear = currentFilter.values.year;
  const FilterMonth = currentFilter.values.month;

  // NOTE - total crad vars
  const MonthData = isExpense ? TotalByMonth_EXP : TotalByMonth_INC;

  // NOTE - total crad vars
  const total =
    (isReccuring && rcTotal.monthly) ??
    getTotalInMonthOfYear(MonthData, FilterYear, FilterMonth);
  const HeadText =
    (isReccuring && "Monthly Recurring Exp") ||
    (isExpense && "Monthly Expense") ||
    (!isExpense && "Monthly Income");
  const Color =
    (isReccuring && "text-rep-a1") ||
    (isExpense && "text-exp-a1") ||
    (!isExpense && "text-inc-a2");
  const FooterText =
    (isReccuring &&
      `Your Total Reccuring Expense in ${getMonthName(FilterMonth, "MMMM")} `) ||
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
    ></TotalCard>
  );
};

export default TotalCardForMonth;
