import BudgetStrip from "@/components/strips/budget-strip";
import TotalCard from "@/components/cards/TotalCard";
import ExpButton from "@/components/buttons/expButton";
import Flexrow from "@/components/section/flexrow";
import { PATH } from "@/router/routerConfig";
import React from "react";
import { useNavigate } from "react-router-dom";
import TotalExpenseCardInyear from "@/components/cards/total-card-for-month";
import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";
import TotalExpenseCardInmonth from "@/components/cards/total-card-for-year";

const RepeatingExpenseIndex = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flexrow className="flex-wrap items-center justify-center">
        <TotalExpenseCardInyear year={CurrentYear()} />
        <TotalExpenseCardInmonth year={CurrentYear()} month={CurrentMonth()} />
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
