import IncomeCategoryAnalysis from "@/components/analysis/Income-Category-Analysis";
import { LinearGraphData } from "@/components/analysis/linear-graph-data";
import Flexcol from "@/components/section/flexcol";
import SectionTitle from "@/components/section/section-title";
import NewIncome from "../income/NewIncome";
import Flexrow from "@/components/section/flexrow";
import { Spinner } from "flowbite-react";
import useTransactionConfig from "@/hooks/useTransactionConfig";

const IncomeAnalysisIndex = () => {
  const { IncomeList, incomeLoading, incomeError } = useTransactionConfig();

  // NOTE: 1. Handle the loading state first
  if (incomeLoading) {
    // Replace with your preferred loading spinner component
    return (
      <Flexrow className="h-full items-center justify-center">
        <Spinner
          className="text-slate-a3 fill-inc-a1"
          size="lg"
          aria-label="expense page loader"
        />
      </Flexrow>
    );
  }

  // NOTE: 2. Handle the error state next
  if (incomeError) {
    return (
      <>
        <Flexrow className="h-full items-center justify-center">
          ERROR : {incomeError}
        </Flexrow>
      </>
    );
  }

  //NOTE: 3. Handle the "no data" state
  if (!IncomeList || IncomeList.length === 0) {
    // This gives the user a clear message if there's nothing to show
    return <NewIncome />;
  }

  // NOTE: 4. If all checks pass, render the main content
  return (
    <>
      <Flexcol className="pt-20">
        <SectionTitle title="Bar Graph" isExpense />
        <LinearGraphData isIncome isAnalysis />
      </Flexcol>
      <Flexcol className="pt-20">
        <SectionTitle title="Double Line Graph" isExpense />
      </Flexcol>
      <Flexcol className="pt-20">
        <SectionTitle title="Income Analysis By Category" isExpense />
        <IncomeCategoryAnalysis />
      </Flexcol>
    </>
  );
};

export default IncomeAnalysisIndex;
