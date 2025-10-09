// React Core
import { useCallback, useMemo, useState } from "react";

// --- Components ---

// Layout & Sectioning
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import SectionTitle from "@/components/section/section-title";
import HorizontalDivider from "@/components/strips/horizontal-divider";

// Cards
import ActiveBudgetCard from "@/components/cards/active-budget-card";
import TotalCardForYear from "@/components/cards/total-card-for-year";

// Tables
import BudgetExpenseTable from "@/components/table/budget-expense-table";
import BudgetTable from "@/components/table/budget-table";

// Filters & Selectors
import SelectBar from "@/components/selectFilter/SelectBar";
import SelectCard from "@/components/selectFilter/SelectCard";
import SelectFilter from "@/components/selectFilter/SelectFilter";

// Strips & Indicators
import FlexrowStrip from "@/components/strips/flexrow-strip";

// Buttons & Icons
import ExpButton from "@/components/buttons/exp-button";
import { Icons } from "@/components/icons";

// --- Hooks ---
import useBudgetConfig, { getBudgetExpPercent } from "@/hooks/useBudgetConfig";
import useTotalConfig from "@/hooks/useTotalConfig";

// --- Utilities ---
import { CurrentYear } from "@/utilities/calander-utility";
import { amountFloat } from "@/components/utilityFilter";
import { Spinner } from "flowbite-react";

const BudgetIndex = () => {
  //NOTE - TOTAL CONFIG
  const {
    TotalByMonth_EXP,
    TotalByYear_EXP,
    YearsList,
    getMonthListOfYear,
    getTotalOfYear,
  } = useTotalConfig();
  //NOTE - BUDGET CONFIG
  const {
    Budget,
    BudgetLoading,
    BudgetError,
    getBudgetListOfYear,
    BudgetByMonth,
    budgetList,
    createBudgetWithExpense,
    getTotalBudgetOfYear,
  } = useBudgetConfig();

  const [year, setYear] = useState(CurrentYear());
  const handleYearSelector = useCallback((year) => setYear(Number(year)), []);

  const BudgetEachMonth = useMemo(() => {
    return getBudgetListOfYear(BudgetByMonth, year);
  }, [BudgetByMonth, year, getBudgetListOfYear]);
  const ExpenseEachMonth = useMemo(() => {
    return getMonthListOfYear(TotalByMonth_EXP, year);
  }, [TotalByMonth_EXP, year, getMonthListOfYear]);

  const BudgetExpenseCombo = useMemo(() => {
    return createBudgetWithExpense(BudgetEachMonth, ExpenseEachMonth);
  }, [BudgetEachMonth, ExpenseEachMonth, createBudgetWithExpense]);

  const TotalBudgetYear = useMemo(() => {
    return getTotalBudgetOfYear(BudgetByMonth, year);
  }, [BudgetByMonth, year, getTotalBudgetOfYear]);

  const TotalExpenseYear = useMemo(() => {
    return getTotalOfYear(TotalByYear_EXP, year);
  }, [TotalByYear_EXP, year, getTotalOfYear]);

  const BE_Difference = useMemo(() => {
    return TotalBudgetYear - TotalExpenseYear;
  }, [TotalBudgetYear, TotalExpenseYear]);

  const BE_Percent = useMemo(() => {
    return TotalBudgetYear
      ? getBudgetExpPercent(TotalBudgetYear, TotalExpenseYear)
      : // Return 0 instead of null for easier checks in JSX
        0;
  }, [TotalBudgetYear, TotalExpenseYear]);

  // NOTE: 1. Handle the loading state first
  if (BudgetLoading) {
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
  if (BudgetError) {
    return (
      <>
        <Flexrow className="h-full items-center justify-center">
          ERROR : {BudgetError}
        </Flexrow>
      </>
    );
  }
  // NOTE: 3. Handle the "no data" state
  if (!Budget || Budget.length === 0) {
    // This gives the user a clear message if there's nothing to show
    return "Set Budget";
  }
  // NOTE: 4. If all checks pass, render the main content
  return (
    <>
      <Flexrow className={""}>
        <Flexcol className="items-center">
          <TotalCardForYear isExpense year={CurrentYear()} />
          <ActiveBudgetCard />

          <Flexrow className="justify-center">
            <ExpButton as="div" setBudget_textbtn />
            <ExpButton as="div" editBudget_textbtn />
          </Flexrow>
        </Flexcol>
        <Flexcol>
          <BudgetTable list={budgetList ?? []} />
        </Flexcol>
      </Flexrow>

      <Flexcol className="pt-20">
        <SectionTitle title="Monthly Expense On Budget Analysis" isBudget />
        <Flexrow>
          <SelectBar>
            <SelectCard isExpense title={"Select Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={String(CurrentYear())}
                list={YearsList}
              ></SelectFilter>
            </SelectCard>
          </SelectBar>
        </Flexrow>

        <Flexcol>
          {!TotalBudgetYear ? (
            <FlexrowStrip>
              NO Budget Exist To Show Data of Year{" "}
              <span className="text-budget">{year}</span>
            </FlexrowStrip>
          ) : (
            <>
              <BudgetExpenseTable inBudgeting data={BudgetExpenseCombo} />
              <FlexrowStrip className="text-14px gap-1.25">
                <span>Comparatively in {year} </span>
                <HorizontalDivider className="bg-white" />
                <span> You are </span>
                <span>
                  {BE_Difference > 0 && "Under Budget"}
                  {BE_Difference < 0 && "Over Budget"}
                  {BE_Difference === 0 && "Break Even"}
                </span>
                <HorizontalDivider className="bg-white" />
                <span>
                  {BE_Difference > 0 && "You Saved"}
                  {BE_Difference < 0 && "Your Over Spent"}
                </span>
                <span className="text-12px">
                  <Icons.rupee />
                </span>
                <span
                  className={`${BE_Difference > 0 ? "text-gg" : "text-rr"}`}
                >
                  {amountFloat(BE_Difference)}
                </span>
                <HorizontalDivider className="bg-white" />
                i.e
                <span className={`${BE_Percent < 0 ? "text-gg" : "text-rr"}`}>
                  {BE_Percent} %
                </span>
                <span className="text-12px">
                  {BE_Percent < 0 && <Icons.graphdown className="text-gg" />}
                  {BE_Percent > 0 && <Icons.graphup className="text-rr" />}
                </span>
              </FlexrowStrip>
            </>
          )}
        </Flexcol>

        <Flexrow className="flex-wrap items-center">
          <div className="flex flex-wrap gap-5">
            {/*  {MonthList.map((item) => (
              <MonthlyBudgetStrip
                isExpense
                key={item.month}
                month={item.month}
                budget={bb(BudgetListByMonth, item.month)}
                amount={item.total}
              />
            ))}  */}
          </div>
        </Flexrow>
        <Flexrow className="text-14px items-center justify-start font-medium">
          <ExpButton label={"Check Analysis"} btnfor={"expense"} />
          <h4>For Detailed Budget Analysis</h4>
        </Flexrow>
      </Flexcol>
    </>
  );
};

export default BudgetIndex;
