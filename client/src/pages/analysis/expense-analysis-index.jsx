import ExpenseCategoryAnalysis from "@/components/analysis/Expense-Category-Analysis";
import { LinearGraphData } from "@/components/analysis/linear-graph-data";
import { DualGraphData } from "@/components/analysis/dual-graph-data";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import SectionTitle from "@/components/section/section-title";
import useTransactionConfig from "@/hooks/useTransactionConfig";
import { Spinner } from "flowbite-react";
import NewExpense from "../expense/NewExpense";

const ExpenseAnalysisIndex = () => {
  const { ExpenseList, expenseLoading, expenseError } = useTransactionConfig();
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
      <Flexcol className="pt-20">
        <SectionTitle title="Bar Graph" isExpense />
        <LinearGraphData isExpense isAnalysis />
      </Flexcol>
      <Flexcol className="pt-20">
        <SectionTitle title="Double Line Graph" isExpense />
        <DualGraphData isExpense />
      </Flexcol>
      <Flexcol className="pt-20">
        <SectionTitle title="Expense By Category Analysis" isExpense />
        <ExpenseCategoryAnalysis />
      </Flexcol>
    </>
  );
};

export default ExpenseAnalysisIndex;
