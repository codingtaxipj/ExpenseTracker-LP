import TableSection from "@/components/table/transaction-list-table";
import BudgetStrip from "@/components/strips/budget-strip";
import Flexrow from "@/components/section/flexrow";
import SelectBar from "@/components/selectFilter/SelectBar";
import SelectCard from "@/components/selectFilter/SelectCard";
import SelectFilter from "@/components/selectFilter/SelectFilter";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router/routerConfig";
import { sortBy } from "@/global/globalVariables";
import { useState } from "react";
import {
  expenseCategories,
  getPrimeCategories,
  getSubCategories,
} from "@/global/categories";
import ExpButton from "@/components/buttons/expButton";
import { Icons } from "@/components/icons";
import SectionTitle from "@/components/section/section-title";
import Flexcol from "@/components/section/flexcol";
import AddExpenseBtn from "@/components/buttons/text-btns/add-expense-btn";
import SelectFilterIcon from "@/components/buttons/icon-only-btns/select-filter-icon";
import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";
import useTransactionConfig from "@/hooks/useTransactionConfig";
import SingleYearGraph from "@/components/analysis/Single-Year-Graph";
import TotalCardForYear from "@/components/cards/total-card-for-year";
import TotalCardForMonth from "@/components/cards/total-card-for-month";
import EButton from "@/components/buttons/eButton";
import TransactionListTable from "@/components/table/transaction-list-table";
import MonthCalander from "@/components/month-calender";
import MaxCategorySection from "@/components/section/max-category-section";

const ExpenseIndex = () => {
  /** =========== Navigation =========== */
  const navigate = useNavigate();
  /** =========== Transaction Config =========== */
  const { ExpenseList } = useTransactionConfig();

  const [filters, setFilters] = useState("None");
  const sortList = Object.values(sortBy);

  const primeCats = getPrimeCategories(expenseCategories);
  const subCats = getSubCategories(expenseCategories);

  const handlePrimeCat = (value) => {
    console.log("Prime : ", value);
  };
  const handleSubCat = (value) => {
    console.log("Sub : ", value);
  };

  const handleSortBy = (value) => setFilters(value);

  return (
    <>
      <Flexcol>
        {/** =========== Top - cards & Calender =========== */}
        <Flexrow className="items-center justify-center">
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
        <Flexrow className="items-center justify-center">
          <BudgetStrip />
          <EButton
            isTextIcon
            addExpense
            onClick={() => navigate(PATH.addExpense)}
          />
        </Flexrow>
      </Flexcol>

      {/** =========== List and List Filter =========== */}

      <Flexcol className="pt-20">
        <SectionTitle title="Expenses Transactions List" isExpense />
        <SelectBar>
          <SelectCard isExpense title={"Sort List"}>
            <SelectFilter
              placeholder={"Select Type"}
              onValueChange={handleSortBy}
              defaultValue={sortBy.none}
              list={sortList}
            ></SelectFilter>
          </SelectCard>
          {filters === sortBy.none && (
            <SelectCard isExpense title={"NONE"}></SelectCard>
          )}
          {filters === sortBy.primeCategory && (
            <SelectCard isExpense>
              <SelectFilter
                placeholder={"Select Prime Category"}
                onValueChange={handlePrimeCat}
                list={primeCats}
              ></SelectFilter>
            </SelectCard>
          )}
          {filters === sortBy.subCategory && (
            <SelectCard isExpense>
              <SelectFilter
                placeholder={"Select Sub Category"}
                onValueChange={handleSubCat}
                list={subCats}
              ></SelectFilter>
            </SelectCard>
          )}
          {filters === sortBy.date && (
            <SelectCard isExpense title={"Select Range"}>
              Date 1 to Date 2
            </SelectCard>
          )}
          {filters === sortBy.amount && (
            <SelectCard isExpense title="From">
              <AmountField></AmountField>
              <button className="px-2">To</button>
              <AmountField></AmountField>
            </SelectCard>
          )}
          {filters === sortBy.trip && (
            <SelectCard isExpense title={"Select Trip"}>
              <SelectFilter
                placeholder={"Select Trip"}
                defaultValue={"2024"}
                list={[2024, 2025, 2026]}
              ></SelectFilter>
            </SelectCard>
          )}
          {filters === sortBy.repeating && (
            <SelectCard isExpense title={"Repeat By"}>
              <SelectFilter
                placeholder={"Repeat By"}
                defaultValue={"2024"}
                list={[2024, 2025, 2026]}
              ></SelectFilter>
            </SelectCard>
          )}

          <Flexrow className={"w-max gap-2"}>
            <SelectFilterIcon inactive className={"hover:bg-exp"}>
              <Icons.check />
            </SelectFilterIcon>
            <SelectFilterIcon inactive className={"hover:bg-exp"}>
              <Icons.asc />
            </SelectFilterIcon>
            <SelectFilterIcon inactive className={"hover:bg-exp"}>
              <Icons.desc />
            </SelectFilterIcon>
            <SelectFilterIcon inactive className={"hover:bg-exp"}>
              <Icons.listSort />
            </SelectFilterIcon>
          </Flexrow>
        </SelectBar>

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
        <Flexrow className="text-14px pt-5 items-center justify-end font-medium">
          <h4>For Detailed Expense Analysis</h4>
          <EButton
            isTextIcon
            className={"bg-exp"}
            onClick={() => navigate(PATH.expenseAnalysis)}
          >
            <Icons.upbar /> Check Analysis
          </EButton>
        </Flexrow>
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
