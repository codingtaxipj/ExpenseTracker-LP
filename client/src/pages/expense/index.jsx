// --- React Core ---
import { useState, useCallback } from "react";

// --- 3rd Party Libraries ---
import { Spinner } from "flowbite-react";
import { cn } from "@/lib/utils";

// --- App Hooks ---
import useTransactionConfig from "@/hooks/useTransactionConfig";

// --- App Components ---
import SingleYearGraph from "@/components/analysis/Single-Year-Graph";
import ExpButton from "@/components/buttons/exp-button";
import TotalCardForMonth from "@/components/cards/total-card-for-month";
import TotalCardForYear from "@/components/cards/total-card-for-year";
import { Icons } from "@/components/icons";
import MonthCalander from "@/components/month-calender";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import MaxCategorySection from "@/components/section/max-category-section";
import SectionTitle from "@/components/section/section-title";
import SelectBar from "@/components/selectFilter/SelectBar";
import SelectCard from "@/components/selectFilter/SelectCard";
import SelectFilter from "@/components/selectFilter/SelectFilter";
import BudgetStrip from "@/components/strips/budget-strip";
import TransactionListTable from "@/components/table/transaction-list-table";
import NewExpense from "./NewExpense";

// --- Global Variables & Utilities ---
import {
  expenseCategories,
  getPrimeCategories,
  getSubCategories,
} from "@/global/categories";
import { sortBy } from "@/global/globalVariables";
import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";

const SORT_LIST = Object.values(sortBy);
const PRIME_CATS = getPrimeCategories(expenseCategories);
const SUB_CATS = getSubCategories(expenseCategories);

const ExpenseIndex = () => {
  /** =========== Transaction Config =========== */
  const { ExpenseList, expenseLoading, expenseError } = useTransactionConfig();

  // --- UI State ---
  const [filter, setFilter] = useState("Default");

  //! make below handler as callback when complete
  const handlePrimeCat = (value) => {
    console.log("Prime : ", value);
  };
  const handleSubCat = (value) => {
    console.log("Sub : ", value);
  };

  const handleSortBy = useCallback((value) => {
    setFilter(value);
  }, []);

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
      <Flexcol className="gap-8">
        {/** =========== Top - cards & Calender =========== */}
        <Flexrow className="items-center justify-center gap-10">
          <Flexcol className="w-max">
            <TotalCardForYear isExpense year={CurrentYear()} />
            <TotalCardForMonth
              isExpense
              year={CurrentYear()}
              month={CurrentMonth()}
            />
          </Flexcol>
          <MonthCalander isExpense list={ExpenseList ?? []} />
        </Flexrow>
        {/** =========== Top - Budget Strip & Add Exp Btn =========== */}
        <Flexrow className="items-center justify-evenly px-5">
          <BudgetStrip />
          <ExpButton addExpense />
        </Flexrow>
      </Flexcol>

      {/** =========== List and List Filter =========== */}

      <Flexcol className="pt-20">
        <SectionTitle title="Expenses Transactions List" isExpense />
        <Flexrow>
          <SelectBar>
            <SelectCard isExpense title={"Sort List"}>
              <SelectFilter
                placeholder={"Select Type"}
                onValueChange={handleSortBy}
                defaultValue={sortBy.default}
                list={SORT_LIST}
              />
            </SelectCard>
          </SelectBar>

          <Flexrow className={"text-18px items-center gap-2.5"}>
            <ExpButton
              custom_iconbtn
              custom_toolContent="Amount Ascending"
              className={cn("bg-dark-a5", "hover:bg-exp-a3 hover:text-dark-a1")}
            >
              <Icons.asc />
            </ExpButton>
            <ExpButton
              custom_iconbtn
              custom_toolContent="Amount Descending"
              className={cn("bg-dark-a5", "hover:bg-exp-a3 hover:text-dark-a1")}
            >
              <Icons.desc />
            </ExpButton>
            <ExpButton
              custom_iconbtn
              custom_toolContent="Reverse Order"
              className={cn("bg-dark-a5", "hover:bg-exp-a3 hover:text-dark-a1")}
            >
              <Icons.listSort />
            </ExpButton>
          </Flexrow>
        </Flexrow>

        {/* <Flexrow className={"w-max gap-2"}>
            
          </Flexrow> */}

        {filter !== sortBy.default && (
          <>
            <SelectBar>
              <SelectCard isExpense title={"Sort List"}>
                {filter === sortBy.primeCategory && (
                  <SelectFilter
                    placeholder={"Select Prime Category"}
                    onValueChange={handlePrimeCat}
                    list={PRIME_CATS}
                  />
                )}
                {filter === sortBy.subCategory && (
                  <SelectFilter
                    placeholder={"Select Sub Category"}
                    onValueChange={handleSubCat}
                    list={SUB_CATS}
                  />
                )}
                {filter === sortBy.date && "Date 1 to Date 2"}
                {filter === sortBy.amount && "Amount 1 to Amount 2"}
                {filter === sortBy.trip && (
                  <SelectFilter
                    placeholder={"Select Trip"}
                    defaultValue={"2024"}
                    list={[2024, 2025, 2026]}
                  />
                )}
                {filter === sortBy.repeating && (
                  <SelectFilter
                    placeholder={"Repeat By"}
                    defaultValue={"2024"}
                    list={[2024, 2025, 2026]}
                  />
                )}
              </SelectCard>
            </SelectBar>
          </>
        )}

        {/** =========== List Component =========== */}

        <TransactionListTable isExpesne entries={ExpenseList ?? []} />
      </Flexcol>

      {/** =========== Bar Graph =========== */}

      <Flexcol className="pt-20">
        <SectionTitle title="Expense Bar Graph" isExpense />
        <SingleYearGraph isExpense></SingleYearGraph>
      </Flexcol>

      {/** =========== Max Expenses =========== */}

      <Flexcol className="pt-20">
        <SectionTitle title="Top 5 Maximum Expense Categories" isExpense />
        <MaxCategorySection isExpense />
      </Flexcol>
    </>
  );
};

export default ExpenseIndex;

export const AmountField = () => {
  return (
    <>
      <input
        className="text-14px number-filed-arrow-none bg-darkBlack w-25 rounded-md px-3 py-1 outline-none"
        type="number"
      />
    </>
  );
};
