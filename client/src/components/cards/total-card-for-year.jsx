import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import { amountFloat } from "../utilityFilter";
import TotalCard from "./TotalCard";

import useTotalConfig from "@/hooks/useTotalConfig";

const TotalCardForYear = ({ isExpense, isAnalysis, year }) => {
  //NOTE - TOTAL CONFIG
  const { TotalByYear_EXP, TotalByYear_INC, getTotalOfYear } = useTotalConfig();
  const YearData = isExpense ? TotalByYear_EXP : TotalByYear_INC;
  const total = getTotalOfYear(YearData, year);
  const HeadText = isExpense ? "Year Expense" : "Year Income";
  const Color = isExpense ? "text-exp" : "text-inc";
  const diff =
    getTotalOfYear(TotalByYear_INC, year) -
    getTotalOfYear(TotalByYear_EXP, year);
  const FooterText = isAnalysis ? (
    <>
      <Flexrow className={"items-center gap-1"}>
        <span>
          {diff > 0 && "You Saved"} {diff < 0 && "You Over Spent"}{" "}
          {diff == 0 && "Break Even"}
        </span>
        <span>Rs.</span>
        <span
          className={` ${diff > 0 && "text-gg"} ${diff < 0 && "text-rr"} ${diff == 0 && "text-budget"}`}
        >
          {" "}
          {amountFloat(diff)}
        </span>
      </Flexrow>
    </>
  ) : isExpense ? (
    `Your Total Spending in Year ${year}`
  ) : (
    `Your Total Earning in Year ${year}`
  );

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
