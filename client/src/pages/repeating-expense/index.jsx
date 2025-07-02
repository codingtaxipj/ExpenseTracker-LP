import BudgetStrip from "@/components/strips/budget-strip";
import SectionOuterFlexcol from "@/components/analysis/section-outer-flexcol";
import TotalCard from "@/components/analysis/TotalCard";
import ExpButton from "@/components/custom-ui/expButton";
import Flexrow from "@/components/section/flexrow";
import { PATH } from "@/router/routerConfig";
import React from "react";
import { useNavigate } from "react-router-dom";

const RepeatingExpenseIndex = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flexrow className="flex-wrap items-center justify-center">
        <TotalCard
          isExpense
          color="text-exptxt"
          headText="Expense"
          total={2025}
          footerText={"Your Total Spending in Year"}
          date={2025}
        ></TotalCard>
        <TotalCard
          isExpense
          color="text-exptxt"
          headText="Expense"
          total={2025}
          footerText={"Your Total Spending in Year"}
          date={2025}
        ></TotalCard>
      </Flexrow>
      <Flexrow className="flex-wrap items-center justify-center pt-5">
        <BudgetStrip isExpense amount={20000} color="text-exptxt" />
        <ExpButton
          onClick={() => navigate(PATH.addRepeatingExpense)}
          btnfor="expense"
          label={"Add Recurring Payment"}
        />
      </Flexrow>
    </>
  );
};

export default RepeatingExpenseIndex;
