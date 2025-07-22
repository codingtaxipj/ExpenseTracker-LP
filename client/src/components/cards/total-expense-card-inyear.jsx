import React from "react";
import TotalCard from "./TotalCard";

import UseTotalConfig from "@/hooks/useTotalConfig";

const TotalExpenseCardInyear = ({ year }) => {
  //NOTE - TOTAL CONFIG
  const { getTotalExpOfYear } = UseTotalConfig();
  const TotalYearExp = getTotalExpOfYear(year);

  return (
    <TotalCard
      isExpense
      color="text-exp"
      headText="Expense"
      total={TotalYearExp}
      footerText={"Your Total Spending in Year"}
      date={year}
    ></TotalCard>
  );
};

export default TotalExpenseCardInyear;
