import TableSection from "@/components/TableSection";

import BarChartSection from "@/components/BarChartSection";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import usePageConfig from "@/components/usePageConfig";
import SectionHeader from "@/components/section-header";
import TotalCard from "@/components/analysis/TotalCard";

const IncomeIndex = () => {
  const { dataConfig } = usePageConfig();

  return (
    <>
      <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-full overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
        {dataConfig.income.loading && <p>Loading...</p>}
        {!dataConfig.income.loading && (
          <>
            <div className="flex w-full flex-row justify-center gap-5 pt-10 pb-25">
              <TotalCard
                color="text-inctxt"
                headText="Expense"
                total={2025}
                footerText={"Your Total Spending in Year"}
                date={2025}
              ></TotalCard>
              <TotalCard
                color="text-inctxt"
                headText="Expense"
                total={2025}
                footerText={"Your Total Spending in Month"}
                date={"June/25"}
              ></TotalCard>
              <TotalCard
                total={2025}
                color="text-inctxt"
                headText="Avg Yearly Expense"
                footerText={"Your Avg Spending in a Year"}
                date={2025}
              ></TotalCard>
            </div>
            <SectionHeader title="Expense Analysis By Year" />
            <div className="mt-6 py-4">
              <div className="bg-grey-hover flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
                <div>
                  <span className="h-7 rounded-md px-2 text-sm">
                    Filter Table
                  </span>
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                      <SelectValue placeholder="Sort By Type" />
                    </SelectTrigger>
                    <SelectContent className="w-40">
                      <SelectItem value="subCat">Category</SelectItem>
                      <SelectItem value="primeCat">Category From</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                      <SelectValue placeholder="Sort By Value" />
                    </SelectTrigger>
                    <SelectContent className="w-40">
                      <SelectItem value="subCat">Category</SelectItem>
                      <SelectItem value="primeCat">Category From</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <TableSection entries={dataConfig.income.entries} />
            <div className="pt-6">
              <BarChartSection
                isExpense={false}
                entries={dataConfig.income.entries}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default IncomeIndex;
