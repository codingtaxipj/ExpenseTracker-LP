import React from "react";
import TotalCard from "./TotalCard";
import useBudgetConfig from "@/hooks/useBudgetConfig";
import {
  CurrentMonth,
  CurrentYear,
  getMonthName,
} from "@/utilities/calander-utility";

const ActiveBudgetCard = () => {
  const { BudgetByMonth, getBudgetListOfYear } = useBudgetConfig();

  //NOTE - arry OBJ of each month and budget by year
  const BudgetEachMonth = getBudgetListOfYear(BudgetByMonth);

  return (
    <>
      <TotalCard
        color="text-budget"
        headText="Active Budget"
        total={
          BudgetEachMonth?.find((bm) => bm.month === CurrentMonth())?.budget
        }
        footerText={`Budget of ${getMonthName(CurrentMonth(), "MMMM")}, ${CurrentYear()}`}
        date={CurrentYear()}
      ></TotalCard>
    </>
  );
};

export default ActiveBudgetCard;
