import React, { useMemo } from "react";
import TotalCard from "./TotalCard";
import useBudgetConfig from "@/hooks/useBudgetConfig";
import { getDate } from "@/utilities/calander-utility";
import moment from "moment";
import { useFilterConfig } from "@/hooks/useFilterConfig";

const ActiveBudgetCard = () => {
  const { BudgetByMonth } = useBudgetConfig();
  const { FilterMonth } = useFilterConfig();
  const currentBudget = useMemo(
    () => BudgetByMonth?.find((b) => b.month === FilterMonth),
    [BudgetByMonth, FilterMonth],
  );

  return (
    <>
      <TotalCard
        color="text-bud-a1"
        headText="Active Budget"
        total={currentBudget.amount}
        footerText={`Active From : ${getDate(currentBudget.created, "MMM, YYYY")}`}
        date={moment().format("MMM, YYYY")}
      />
    </>
  );
};

export default ActiveBudgetCard;
