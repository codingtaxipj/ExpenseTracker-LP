import ExpenseCategoryAnalysis from "@/components/analysis/Expense-Category-Analysis";
import { LinearGraphData } from "@/components/analysis/linear-graph-data";
import { DualGraphData } from "@/components/analysis/dual-graph-data";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import SectionTitle from "@/components/section/section-title";
import useTransactionConfig from "@/hooks/useTransactionConfig";
import { Spinner } from "flowbite-react";
import NewExpense from "../expense/NewExpense";
import useTotalConfig from "@/hooks/useTotalConfig";
import { ComboTable } from "@/components/table/combo-table";

const ExpenseAnalysisIndex = () => {
  const { ExpenseList, expenseLoading, expenseError } = useTransactionConfig();
  const { IncomeExpenseCombo } = useTotalConfig();
  // NOTE: 1. Handle the loading state first
  if (expenseLoading) {
    // Replace with your preferred loading spinner component
    return (
      <Flexrow className="h-full items-center justify-center">
        <Spinner
          className="text-slate-a3 fill-exp-a1"
          size="lg"
          aria-label="expense page loader"
        />
      </Flexrow>
    );
  }

  // NOTE: 2. Handle the error state next
  if (expenseError) {
    return (
      <>
        <Flexrow className="h-full items-center justify-center">
          ERROR : {expenseError}
        </Flexrow>
      </>
    );
  }
  // NOTE: 3. Handle the "no data" state
  if (!ExpenseList || ExpenseList.length === 0) {
    // This gives the user a clear message if there's nothing to show
    return <NewExpense />;
  }
  // NOTE: 4. If all checks pass, render the main content
  return (
    <>
      <Flexcol>
        <LinearGraphData graphHeightClass="max-h-[350px]" isExpense />
        <LinearGraphData graphHeightClass="max-h-[350px]" isIncome />
        <DualGraphData isDashboard />
        <ComboTable isAnalysis data={IncomeExpenseCombo} />
      </Flexcol>
    </>
  );
};

export default ExpenseAnalysisIndex;
