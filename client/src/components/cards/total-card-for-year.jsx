import useRecurringConfig from "@/hooks/useRecurringConfig";
import TotalCard from "./TotalCard";
import useTotalConfig from "@/hooks/useTotalConfig";

const TotalCardForYear = ({ isExpense, isReccuring, year, className }) => {
  //NOTE - TOTAL Exp and Inc CONFIG
  const { TotalByYear_EXP, TotalByYear_INC, getTotalOfYear } = useTotalConfig();
  const YearData = isExpense ? TotalByYear_EXP : TotalByYear_INC;
  //NOTE - TOTAL Reccuring Exp CONFIG
  const { rcTotal } = useRecurringConfig();

  // NOTE - total crad vars
  const total =
    (isReccuring && rcTotal.byYear) || getTotalOfYear(YearData, year);
  const HeadText =
    (isReccuring && "Recurring Expense") ||
    (isExpense && "Year Expense") ||
    (!isExpense && "Year Income");
  const Color =
    (isReccuring && "text-rep-a1") ||
    (isExpense && "text-exp-a1") ||
    (!isExpense && "text-inc-a2");
  const FooterText =
    (isReccuring && `Your Total Reccuring Expense in Year`) ||
    (isExpense &&
      `Your Total Spending in Year ${year}`) ||
    (!isExpense && `Your Total Earning in Year ${year}`);

  return (
    <TotalCard
      className={className}
      color={Color}
      headText={HeadText}
      total={total}
      footerText={FooterText}
      date={year}
    />
  );
};

export default TotalCardForYear;

/**!SECTION
 * 
 * 
 * 
 * isAnalysis ? (
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
          {amountFloat(diff)}
        </span>
      </Flexrow>
    </>
  )
 */
