import TableSection from "@/components/TableSection";
import usePageConfig from "@/components/usePageConfig";
import TotalCard from "@/components/analysis/TotalCard";
import SectionHeader from "@/components/section-header";
import BudgetStrip from "@/components/analysis/BudgetStrip";
import Flexrow from "@/components/flexrow";
import OuterBar from "@/components/selectFilter/OuterBar";
import SelectCard from "@/components/selectFilter/SelectCard";
import SelectFilter from "@/components/selectFilter/SelectFilter";
import SectionOuterFlexcol from "@/components/analysis/section-outer-flexcol";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router/routerConfig";
import { sortBy } from "@/global/globalVariables";
import { useState } from "react";
import {
  expenseCategories,
  getPrimeCategories,
  getSubCategories,
} from "@/global/categories";
import ExpButton from "@/components/custom-ui/expButton";
import { Icons } from "@/components/icons";
import YearlyAnalysis from "@/components/analysis/YearlyAnalysis";

const ExpenseIndex = () => {
  const { dataConfig } = usePageConfig();
  const navigate = useNavigate();

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
      {dataConfig.expense.loading && <p>Loading...</p>}
      {!dataConfig.expense.loading && (
        <>
          <div className="flex w-full flex-row flex-wrap justify-center gap-5 pt-10 pb-25">
            <TotalCard
              isExpense
              color="text-exptxt"
              headText="Expense"
              total={2025}
              footerText={"Your Total Spending in Year"}
              date={2025}
            ></TotalCard>

            <TotalCard
              isExpense
              color="text-exptxt"
              headText="Expense"
              total={2025}
              footerText={"Your Total Spending in Month"}
              date={"June/25"}
            ></TotalCard>
            <div className="flex flex-col justify-center gap-5">
              <BudgetStrip isExpense amount={20000} color="text-exptxt" />

              <button
                onClick={() => navigate(PATH.addExpense)}
                className="bg-expbg w-full rounded-md px-4 py-1"
              >
                Add Expence
              </button>
            </div>
          </div>
          <SectionOuterFlexcol>
            <SectionHeader title="Expenses List" isExpense />
            <Flexrow>
              <OuterBar>
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
                <div className="text-14 flex gap-2 font-medium" noIcon>
                  <ExpButton
                    btnfor="expenseInactive"
                    className="!px-2"
                    label={<Icons.check />}
                  />
                  <ExpButton
                    btnfor="expenseInactive"
                    className="!px-2"
                    label={<Icons.asc />}
                  />
                  <ExpButton
                    btnfor="expenseInactive"
                    className="!px-2"
                    label={<Icons.desc />}
                  />
                  <ExpButton
                    btnfor="expenseInactive"
                    className="!px-2"
                    label={<Icons.listSort />}
                  />
                </div>
              </OuterBar>
            </Flexrow>
            <TableSection entries={dataConfig.expense.entries} />
          </SectionOuterFlexcol>

          <YearlyAnalysis isExpense />
        </>
      )}
    </>
  );
};

export default ExpenseIndex;

export const AmountField = () => {
  return (
    <>
      <input
        className="text-14 number-filed-arrow-none bg-darkBlack w-25 rounded-md px-3 py-1 outline-none"
        type="number"
      />
    </>
  );
};
