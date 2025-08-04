import React from "react";
import TotalCard from "./TotalCard";

import useTotalConfig from "@/hooks/useTotalConfig";
import { getMonthName } from "@/utilities/calander-utility";

const TotalCardForMonth = ({ isExpense, year, month }) => {
  //NOTE - TOTAL CONFIG
  const { TotalByMonth_EXP, TotalByMonth_INC, getTotalInMonthOfYear } =
    useTotalConfig();
  const MonthData = isExpense ? TotalByMonth_EXP : TotalByMonth_INC;
  const total = getTotalInMonthOfYear(MonthData, year, month);
  const HeadText = isExpense ? "Month Expense" : "Month Income";
  const Color = isExpense ? "text-exp" : "text-inc";
  const FooterText = isExpense
    ? `Your Total Spending in ${getMonthName(month, "MMMM")}, ${year}`
    : `Your Total Earning in ${getMonthName(month, "MMMM")}, ${year}`;

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
