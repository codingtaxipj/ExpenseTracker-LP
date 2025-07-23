import React from "react";
import TotalCard from "./TotalCard";

import useTotalConfig from "@/hooks/useTotalConfig";
import { getMonthName } from "@/utilities/calander-utility";

const TotalExpenseCardInmonth = ({ year, month }) => {
  //NOTE - TOTAL CONFIG
  const { getTotalExpOfMonth } = useTotalConfig();
  const CurrentMonthTotalExp = getTotalExpOfMonth(year, month);

  return (
    <TotalCard
      isExpense
      color="text-exp"
      headText="Expense"
      total={CurrentMonthTotalExp}
      footerText={`Your Total Spending in ${getMonthName(month, "MMMM")}`}
      date={year}
    ></TotalCard>
  );
};

export default TotalExpenseCardInmonth;
