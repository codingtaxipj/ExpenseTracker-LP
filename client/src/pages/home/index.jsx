import Flexrow from "@/components/section/flexrow";
import TypewriterAni from "../../components/TypewriterAni";
import { bgDarkA3 } from "@/global/style";
import { cn } from "@/lib/utils";
import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";
import TotalCardForYear from "@/components/cards/total-card-for-year";
import TotalCardForMonth from "@/components/cards/total-card-for-month";
import TransactionListTable from "@/components/table/transaction-list-table";
import useTransactionConfig from "@/hooks/useTransactionConfig";
import Flexcol from "@/components/section/flexcol";
import BudgetStrip from "@/components/strips/budget-strip";
import useRecurringConfig from "@/hooks/useRecurringConfig";

import { DualGraphCode } from "@/components/charts/dual-graph-code";
import { DualGraphData } from "@/components/analysis/dual-graph-data";

const HomeIndex = () => {
  const { RecentTransactionList } = useTransactionConfig();
  const {} = useRecurringConfig();
  return (
    <>
      <Flexrow className={"mb-5"}>
        <TypewriterAni />
      </Flexrow>

      <Flexrow
        className={cn(
          "!text-14px mb-5 w-full gap-2.5 rounded-sm border px-5 py-0.5",
          bgDarkA3,
        )}
      >
        <Flexrow className="w-1/2 justify-start">Card Section</Flexrow>
        <Flexrow className="w-1/2 justify-end">FF</Flexrow>
      </Flexrow>

      <Flexrow className={"mb-20 flex-wrap"}>
        <DualGraphData isDashboard />
      </Flexrow>

      <Flexrow
        className={cn(
          "!text-14px mb-5 w-full gap-2.5 rounded-sm border px-5 py-0.5",
          bgDarkA3,
        )}
      >
        <Flexrow className="w-1/2 justify-start">Card Section</Flexrow>
        <Flexrow className="w-1/2 justify-end">FF</Flexrow>
      </Flexrow>
      <Flexrow className={"mb-5 flex-wrap"}>
        <BudgetStrip className="w-full lg:flex-1 lg:basis-[280px]" />
      </Flexrow>
      <Flexrow className={"mb-20 flex-wrap"}>
        <TotalCardForYear
          className="w-full lg:flex-1 lg:basis-[280px]"
          isExpense
        />
        <TotalCardForMonth
          className="w-full lg:flex-1 lg:basis-[280px]"
          isExpense
          year={CurrentYear()}
          month={CurrentMonth()}
        />
        <TotalCardForYear className="w-full lg:flex-1 lg:basis-[280px]" />
        <TotalCardForMonth
          className="w-full lg:flex-1 lg:basis-[280px]"
          year={CurrentYear()}
          month={CurrentMonth()}
        />

        <TotalCardForYear
          isReccuring
          className="w-full lg:flex-1 lg:basis-[280px]"
        />
        <TotalCardForMonth
          isReccuring
          className="w-full lg:flex-1 lg:basis-[280px]"
          year={CurrentYear()}
          month={CurrentMonth()}
        />
      </Flexrow>

      <Flexrow
        className={cn(
          "!text-14px mb-5 w-full gap-2.5 rounded-sm border px-5 py-0.5",
          bgDarkA3,
        )}
      >
        <Flexrow className="w-1/2 justify-start">Latest Transactions</Flexrow>
        <Flexrow className="w-1/2 justify-end">FF</Flexrow>
      </Flexrow>
      <Flexcol>
        <TransactionListTable
          isExpesne
          isRecent
          entries={RecentTransactionList ?? []}
        />
      </Flexcol>
    </>
  );
};

export default HomeIndex;
