import TableSection from "@/components/TableSection";
import usePageConfig from "@/components/usePageConfig";
import TotalCard from "@/components/analysis/TotalCard";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router/routerConfig";
import BudgetStrip from "@/components/strips/budget-strip";
import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";
import ExpButton from "@/components/custom-ui/expButton";
import {
  expenseCategories,
  getPrimeCategories,
  getSubCategories,
} from "@/global/categories";
import { useState } from "react";
import { sortBy } from "@/global/globalVariables";
import SectionTitle from "@/components/section/section-title";
import SelectBar from "@/components/selectFilter/SelectBar";
import SelectCard from "@/components/selectFilter/SelectCard";
import SelectFilter from "@/components/selectFilter/SelectFilter";
import { AmountField } from "../expense";
import { Icons } from "@/components/icons";

const IncomeIndex = () => {
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
      {dataConfig.income.loading && <p>Loading...</p>}
      {!dataConfig.income.loading && (
        <>
          <Flexcol>
            <Flexrow className="items-center justify-center">
              <TotalCard
                isExpense
                color="text-inc"
                headText="Income"
                total={2025}
                footerText={"Your Total Earning in Year"}
                date={2025}
              ></TotalCard>
              <TotalCard
                isExpense
                color="text-inc"
                headText="Income"
                total={2025}
                footerText={"Your Total Earning in Month"}
                date={"June/25"}
              ></TotalCard>
            </Flexrow>
            <Flexrow className="items-center justify-center">
              <BudgetStrip isExpense amount={20000} color="text-inc" />
              <ExpButton
                onClick={() => navigate(PATH.addIncome)}
                btnfor="income"
                label={"Add Income"}
              />
            </Flexrow>
          </Flexcol>

          <Flexcol className="pt-20">
            <SectionTitle title="Income List" isIncome />
            <SelectBar>
              <SelectCard title={"Sort List"}>
                <SelectFilter
                  placeholder={"Select Type"}
                  onValueChange={handleSortBy}
                  defaultValue={sortBy.none}
                  list={sortList}
                ></SelectFilter>
              </SelectCard>
              {filters === sortBy.none && (
                <SelectCard title={"NONE"}></SelectCard>
              )}
              {filters === sortBy.primeCategory && (
                <SelectCard>
                  <SelectFilter
                    placeholder={"Select Prime Category"}
                    onValueChange={handlePrimeCat}
                    list={primeCats}
                  ></SelectFilter>
                </SelectCard>
              )}
              {filters === sortBy.subCategory && (
                <SelectCard>
                  <SelectFilter
                    placeholder={"Select Sub Category"}
                    onValueChange={handleSubCat}
                    list={subCats}
                  ></SelectFilter>
                </SelectCard>
              )}
              {filters === sortBy.date && (
                <SelectCard title={"Select Range"}>Date 1 to Date 2</SelectCard>
              )}
              {filters === sortBy.amount && (
                <SelectCard title="From">
                  <AmountField></AmountField>
                  <button className="px-2">To</button>
                  <AmountField></AmountField>
                </SelectCard>
              )}
              {filters === sortBy.trip && (
                <SelectCard title={"Select Trip"}>
                  <SelectFilter
                    placeholder={"Select Trip"}
                    defaultValue={"2024"}
                    list={[2024, 2025, 2026]}
                  ></SelectFilter>
                </SelectCard>
              )}
              {filters === sortBy.repeating && (
                <SelectCard title={"Repeat By"}>
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
            </SelectBar>
            <TableSection entries={dataConfig.income.entries} />
          </Flexcol>
        </>
      )}
    </>
  );
};

export default IncomeIndex;
