import React from "react";
import TotalCard from "./TotalCard";

import useTotalConfig from "@/hooks/useTotalConfig";
import { getMonthName } from "@/utilities/calander-utility";
import useRecurringConfig from "@/hooks/useRecurringConfig";


const TotalCardForMonth = ({ isExpense, isReccuring, year, month }) => {
  //NOTE - TOTAL Exp and Inc CONFIG
  const { TotalByMonth_EXP, TotalByMonth_INC, getTotalInMonthOfYear } =
    useTotalConfig();

  //NOTE - TOTAL Reccuring Exp CONFIG
  const { rcTotal } = useRecurringConfig();

  // NOTE - total crad vars
  const MonthData = isExpense ? TotalByMonth_EXP : TotalByMonth_INC;

  // NOTE - total crad vars
  const total =
    (isReccuring && rcTotal.byMonth) ||
    getTotalInMonthOfYear(MonthData, year, month);
  const HeadText =
    (isReccuring && "Recurring Expense") ||
    (isExpense && "Year Expense") ||
    (!isExpense && "Year Income");
  const Color =
    (isReccuring && "text-rep-a1") ||
    (isExpense && "text-exp-a1") ||
    (!isExpense && "text-inc-a2");
  const FooterText =
    (isReccuring &&
      `Your Total Reccuring Expense in ${getMonthName(month, "MMMM")} `) ||
    (isExpense && `Your Total Spending in ${getMonthName(month, "MMMM")}`) ||
    (!isExpense && `Your Total Earning in ${getMonthName(month, "MMMM")}`);

  return (
    <TotalCard
      color={Color}
      headText={HeadText}
      total={total}
      footerText={FooterText}
      date={year}
    ></TotalCard>
  );
};

export default TotalCardForMonth;
