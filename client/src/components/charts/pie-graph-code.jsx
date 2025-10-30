import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Icons } from "../icons";
import { amountFloat } from "../utilityFilter";
import { cn } from "@/lib/utils";
import { cardBgv2 } from "@/global/style";
import { useMemo } from "react";
import { expenseCategories } from "@/global/categories";

export const LinearGraphCode = ({
  graphHeightClass,
  isArea,
  graphInfo = {
    data: [],
    label: "",
    color: "var(--color-exp-a1)",
  },
  chartInfo = {
    title: false,
    subtext: false,
    footertext: false,
  },
}) => {
  const chartData = graphInfo.data;

  const chartConfig = expenseCategories.map((e) => ({
    [e.title]: {
      label: e.title,
      color: e.color,
    },
  }));

  const myLabelFormatter = (value, payload) => {
    return (
      <span
        style={{
          color:
            expenseCategories.find((e) => e.title === value)?.color ||
            "var(--color-exp-a1)",
        }}
        className="font-medium"
      >
        For : {value}
      </span>
    );
  };

  const myTooltipFormatter = (value, name, item, index, payload) => {
    return (
      <div key={item.dataKey} className="flex w-full items-center gap-2">
        {/* Label and Value */}
        <div className="text-slate-a1 flex flex-1 justify-between leading-none font-medium">
          <span className="pr-1">{item.name || name} : </span>
          <span>{amountFloat(value)}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className={cn("flex-1 gap-0.5 px-3 py-9", cardBgv2)}>
        <CardHeader className="items-center pb-5 pl-10">
          {chartInfo.title && <CardTitle>{chartInfo.title}</CardTitle>}
          {chartInfo.subtext && (
            <CardDescription className="text-slate-a1 pt-1.25">
              {chartInfo.subtext}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className={cn("max-h-[400px] w-full", graphHeightClass)}
          >

            
            
          </ChartContainer>
        </CardContent>
        {chartInfo.footertext && (
          <CardFooter className="text-slate-a4 !text-14px flex-row items-center justify-center gap-2 pt-2.5">
            <Icons.textline /> {chartInfo.footertext}
          </CardFooter>
        )}
      </Card>
    </>
  );
};
