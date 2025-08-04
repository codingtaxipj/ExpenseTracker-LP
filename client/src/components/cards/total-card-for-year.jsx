import TotalCard from "./TotalCard";

import useTotalConfig from "@/hooks/useTotalConfig";

const TotalCardForYear = ({ isExpense, year }) => {
  //NOTE - TOTAL CONFIG
  const { TotalByYear_EXP, TotalByYear_INC, getTotalOfYear } = useTotalConfig();
  const YearData = isExpense ? TotalByYear_EXP : TotalByYear_INC;
  const total = getTotalOfYear(YearData, year);
  const HeadText = isExpense ? "Year Expense" : "Year Income";
  const Color = isExpense ? "text-exp" : "text-inc";
  const FooterText = isExpense
    ? `Your Total Spending in Year ${year}`
    : `Your Total Earning in Year ${year}`;

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

export default TotalCardForYear;
