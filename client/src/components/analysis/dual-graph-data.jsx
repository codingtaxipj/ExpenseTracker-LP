import { DualGraphCode } from "../charts/dual-graph-code";

import { GraphTitleSquare } from "./linear-graph-data";
import Flexcol from "../section/flexcol";
import Flexrow from "../section/flexrow";
import { amountFloat } from "../utilityFilter";
import { Icons } from "../icons";
import { useGraphConfig } from "@/hooks/useGraphConfig";
import { cn } from "@/lib/utils";

export const DualGraphData = ({
  isDashboard,
  isExpense,
}) => {
  const {
    ExpenseGraphData,
    IncomeGraphData,
    GraphTitle,
    GraphSubText,
    GraphFootText,
    TitleTotal,
  } = useGraphConfig({ isDashboard });

  const incomeObj = IncomeGraphData.reduce((newObj, item) => {
    newObj[item.indicator] = item.Amount;
    return newObj;
  }, {});

  console.log("incomeObj", [IncomeGraphData]);
  console.log("ExpenseGraphData", [ExpenseGraphData]);

  const CombinedGraphData = ExpenseGraphData.map((m, i) => {
    const eAmount = m.Amount;
    const eIndicator = m.indicator;
    const iAmount = incomeObj[eIndicator] || 0;
    return {
      indicator: eIndicator,
      Expense: eAmount,
      Income: iAmount,
    };
  });

  const DashboardGraphInfo = {
    data: CombinedGraphData,
    type1: "Expense",
    type1Color: "var(--color-exp-a1)",
    type2: "Income",
    type2Color: "var(--color-inc-a1)",
  };
  const chartInfo = {
    title: (
      <>
        <Flexrow className={"w-max items-center gap-1.25"}>
          <span className="mr-5">{GraphTitle}</span>
          <Flexrow className={"mr-2 w-max items-center gap-1.5"}>
            <Icons.checkCircle className={"text-exp-a1"} />
            <span>Rs.</span>
            <span className={"text-exp-a3"}>{amountFloat(TitleTotal.e)}</span>
          </Flexrow>
          <Flexrow className={"w-max items-center gap-1.5"}>
            <Icons.checkCircle className={"text-inc-a1"} />
            <span>Rs.</span>
            <span className={"text-inc-a3"}>{amountFloat(TitleTotal.i)}</span>
          </Flexrow>
        </Flexrow>
      </>
    ),
    subtext: GraphSubText,
    footertext: GraphFootText,
  };

  return (
    <>
      <Flexcol>
        <Flexrow>
          <DualGraphCode
            isDashboard={isDashboard}
            graphInfo={DashboardGraphInfo}
            chartInfo={chartInfo}
          />
        </Flexrow>
      </Flexcol>
    </>
  );
};
