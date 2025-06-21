import TableSection from "@/components/TableSection";
import BarChartSection from "@/components/BarChartSection";

import usePageConfig from "@/components/usePageConfig";
import TotalCard from "@/components/analysis/TotalCard";
import SectionHeader from "@/components/section-header";
import BudgetStrip from "@/components/analysis/BudgetStrip";
import { Button } from "@/components/ui/button";
import Flexrow from "@/components/flexrow";
import OuterBar from "@/components/selectFilter/OuterBar";
import SelectCard from "@/components/selectFilter/SelectCard";
import SelectFilter from "@/components/selectFilter/SelectFilter";
import SectionOuterFlexcol from "@/components/analysis/section-outer-flexcol";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router/routerConfig";

const ExpenseIndex = () => {
  const { dataConfig } = usePageConfig();
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-full overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
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
                  <SelectCard isExpense title={"Sort List By"}>
                    <SelectFilter
                      placeholder={"Select Type"}
                      defaultValue={"1"}
                      list={[0, 1, 2, 3, 4, 5]}
                    ></SelectFilter>
                  </SelectCard>
                  <SelectCard isExpense>
                    <SelectFilter
                      placeholder={"Filter As"}
                      defaultValue={"1"}
                      list={[0, 1, 2, 3, 4, 5]}
                    ></SelectFilter>
                  </SelectCard>
                </OuterBar>
              </Flexrow>
              <TableSection entries={dataConfig.expense.entries} />
            </SectionOuterFlexcol>

            <SectionOuterFlexcol>
              <Flexrow></Flexrow>
            </SectionOuterFlexcol>
            <BarChartSection
              isExpense={true}
              entries={dataConfig.expense.entries}
            />

            <div className="pt-6"></div>
          </>
        )}
      </div>
    </>
  );
};

export default ExpenseIndex;
