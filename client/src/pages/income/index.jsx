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
import { useNavigate } from "react-router-dom";
import { PATH } from "@/router/routerConfig";
import BudgetStrip from "@/components/analysis/BudgetStrip";

const IncomeIndex = () => {
  const { dataConfig } = usePageConfig();
  const navigate = useNavigate();

  return (
    <>
      {dataConfig.income.loading && <p>Loading...</p>}
      {!dataConfig.income.loading && (
        <>
          <div className="flex w-full flex-row flex-wrap justify-center gap-5 pt-10 pb-25">
            <TotalCard
              color="text-inctxt"
              headText="Income"
              total={2025}
              footerText={"Your Total Spending in Year"}
              date={2025}
            ></TotalCard>

            <TotalCard
              color="text-inctxt"
              headText="Income"
              total={2025}
              footerText={"Your Total Spending in Month"}
              date={"June/25"}
            ></TotalCard>
            <div className="flex flex-col justify-center gap-5">
              <BudgetStrip amount={20000} color="text-inctxt" />

              <button
                onClick={() => navigate(PATH.addIncome)}
                className="bg-incbg w-full rounded-md px-4 py-1"
              >
                Add Income
              </button>
            </div>
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
    </>
  );
};

export default IncomeIndex;
