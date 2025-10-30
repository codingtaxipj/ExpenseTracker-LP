import useRecurringConfig from "@/hooks/useRecurringConfig";
import TotalCard from "./TotalCard";
import useTotalConfig from "@/hooks/useTotalConfig";
import { useFilterConfig } from "@/hooks/useFilterConfig";
import moment from "moment";

const TotalCardForYear = ({ isExpense, isReccuring, className }) => {
  //? ----- Total Config -----
  const { ExpenseOfYear, IncomeOfYear } = useTotalConfig();
  //? ----- Recurring Config -----
  const { RecurringData } = useRecurringConfig();
  //? ----- Filter Config -----
  const { currentFilter } = useFilterConfig();
  const FilterYear = Number(currentFilter.values.year);

  /** ============================================================== */

  //NOTE - Card Props
  const total =
    (isReccuring && RecurringData.YearlyTotal) ??
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
    (isReccuring && `Total expense recurring every year.`) ||
    (isExpense && `Total spending in year ${FilterYear}`) ||
    (!isExpense && `Total earning in year ${FilterYear}`);

  return (
    <TotalCard
      className={className}
      color={Color}
      headText={HeadText}
      total={total}
      footerText={FooterText}
      date={isReccuring ? moment().year() : FilterYear}
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
