import SectionOuterFlexcol from "@/components/analysis/section-outer-flexcol";
import TotalCard from "@/components/analysis/TotalCard";
import Flexrow from "@/components/flexrow";
import React from "react";

const RepeatingExpenseIndex = () => {
  return (
    <>
      <Flexrow className="justify-center flex-wrap" >
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
    </>
  );
};

export default RepeatingExpenseIndex;
