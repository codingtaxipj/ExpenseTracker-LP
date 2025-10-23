import useRecurringConfig from "@/hooks/useRecurringConfig";
import TotalCard from "./TotalCard";
import useTotalConfig from "@/hooks/useTotalConfig";
import { useFilterConfig } from "@/hooks/useFilterConfig";

const TotalCardForYear = ({ isExpense, isReccuring, className }) => {
  //? ----- Total Config -----
  const { ExpenseOfYear, IncomeOfYear } = useTotalConfig();
  //? ----- Recurring Config -----
  const { rcTotal } = useRecurringConfig();
  //? ----- Filter Config -----
  const { currentFilter } = useFilterConfig();
  const FilterYear = Number(currentFilter.values.year);

  /** ============================================================== */

  //NOTE - Card Props
  const total =
    (isReccuring && rcTotal.yearly) ??
    (isExpense && ExpenseOfYear) ??
    (!isExpense && IncomeOfYear);
  const HeadText =
    (isReccuring && "Recurring Expense") ||
    (isExpense && "Year Expense") ||
    (!isExpense && "Year Income");
  const Color =
    (isReccuring && "text-rep-a1") ||
    (isExpense && "text-exp-a1") ||
    (!isExpense && "text-inc-a2");
  const FooterText =
    (isReccuring && `Your Total Yearly Reccuring Expense`) ||
    (isExpense && `Your Total Spending in Year ${FilterYear}`) ||
    (!isExpense && `Your Total Earning in Year ${FilterYear}`);

  return (
    <TotalCard
      className={className}
      color={Color}
      headText={HeadText}
      total={total}
      footerText={FooterText}
      date={FilterYear}
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
