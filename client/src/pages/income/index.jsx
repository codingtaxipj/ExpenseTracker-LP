// --- React & Related ---
import { useNavigate } from "react-router-dom";

// --- 3rd Party Libraries ---
import { Spinner } from "flowbite-react";

// --- App Hooks ---
import useTransactionConfig from "@/hooks/useTransactionConfig";

// --- App Components ---
import { LinearGraphData } from "@/components/analysis/linear-graph-data";
import ExpButton from "@/components/buttons/exp-button";
import TotalCardForMonth from "@/components/cards/total-card-for-month";
import TotalCardForYear from "@/components/cards/total-card-for-year";
import { Icons } from "@/components/icons";
import MonthCalander from "@/components/month-calender";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import MaxCategorySection from "@/components/section/max-category-section";
import SectionTitle from "@/components/section/section-title";
import BudgetStrip from "@/components/strips/budget-strip";
import TransactionListTable from "@/components/table/transaction-list-table";
import NewIncome from "./NewIncome";

// --- App Utilities & Config ---
import { PATH } from "@/router/routerConfig";
import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";

const IncomeIndex = () => {
  const navigate = useNavigate();
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
      <Flexcol className="gap-8">
        <Flexrow className="items-center justify-center gap-10">
          <Flexcol className="w-max">
            <TotalCardForYear year={CurrentYear()} />
            <TotalCardForMonth year={CurrentYear()} month={CurrentMonth()} />
          </Flexcol>
          <MonthCalander list={IncomeList ?? []} />
        </Flexrow>
        <Flexrow className="items-center justify-evenly px-5">
          <BudgetStrip />
          <ExpButton addIncome />
        </Flexrow>
      </Flexcol>

      <Flexcol className="pt-20">
        <SectionTitle title="Income Transaction List" isIncome />
        <TransactionListTable entries={IncomeList ?? []} />
      </Flexcol>
      <Flexcol className="pt-20">
        <SectionTitle isIncome title="Income Bar Graph" />
        <LinearGraphData isIncome />
      </Flexcol>
      <Flexcol className="pt-20">
        <SectionTitle title="Top 5 Maximum Expense Categories" isIncome />
        <MaxCategorySection />
        <Flexrow className="text-14px items-center justify-end pt-5 font-medium">
          <h4>For Detailed Income Analysis</h4>
          <ExpButton
            custom_textbtn
            className={"bg-inc"}
            onClick={() => navigate(PATH.incomeAnalysis)}
          >
            <Icons.upbar /> Check Analysis
          </ExpButton>
        </Flexrow>
      </Flexcol>
    </>
  );
};

export default IncomeIndex;
