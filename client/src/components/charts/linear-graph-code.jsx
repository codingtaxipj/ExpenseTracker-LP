import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  LabelList,
  AreaChart,
  Area,
  YAxis,
} from "recharts";

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
import { bgDarkA3, cardBgv2 } from "@/global/style";
import Flexrow from "../section/flexrow";
import { Numeral } from "numeral";

export const LinearGraphCode = ({
  isArea,
  barInfo = {
    data: [],
    label: "",
    color: "var(--color-exp-a1",
  },
  chartInfo = {
    title: false,
    subtext: false,
    footertext: false,
  },
}) => {
  const chartData = barInfo.data;
  const color = barInfo.color;
  const label = barInfo.label;
  const chartConfig = {
    [label]: {
      label: barInfo.label,
      color: color,
    },
  };

  console.log("Area is", isArea);

  const myLabelFormatter = (value, payload) => {
    return (
      <span style={{ color: color }} className="font-medium">
        For : {value}
      </span>
    );
  };

  const myTooltipFormatter = (value, name, item, index, payload) => {
    return (
      <div key={item.dataKey} className="flex w-full items-center gap-2">
        {/* Indicator */}
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
          style={{ backgroundColor: color }}
        />
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
            className={"max-h-[500px] w-full"}
          >
            {isArea === true && (
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 25,
                  left: 20,
                  right: 20,
                }}
              >
                <CartesianGrid stroke="var(--color-dark-a6)" vertical={false} />
                <XAxis
                  dataKey="indicator"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  minTickGap={20}
                  className="[&_.recharts-cartesian-axis-tick_text]:fill-slate-a4"
                  tickFormatter={(value) => value}
                  interval={"preserveStartEnd"}
                />

                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      className={"bg-dark-a1.2 border-dark-a6"}
                      formatter={myTooltipFormatter}
                      hideIndicator={false}
                      labelFormatter={myLabelFormatter}
                    />
                  }
                />

                <Area
                  dataKey={"Amount"}
                  type="monotone"
                  fill={color}
                  fillOpacity={0.2}
                  stroke={color}
                />
              </AreaChart>
            )}
            {isArea === false && (
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 25,
                  left: 20,
                  right: 20,
                }}
              >
                <CartesianGrid stroke="var(--color-dark-a6)" vertical={false} />
                <XAxis
                  dataKey="indicator"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  className="[&_.recharts-cartesian-axis-tick_text]:fill-slate-a4"
                  tickFormatter={(value) => value}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      className={"bg-dark-a1.2 border-dark-a6"}
                      formatter={myTooltipFormatter}
                      hideIndicator={false}
                      labelFormatter={myLabelFormatter}
                    />
                  }
                />
                <Bar dataKey="Amount" fill={color} radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-slate-a1"
                    fontSize={12}
                    formatter={(value) => (value ? amountFloat(value) : value)}
                  />
                </Bar>
              </BarChart>
            )}
          </ChartContainer>
        </CardContent>
        {chartInfo.footertext && (
          <CardFooter className="flex-col gap-2">
            <Flexrow className="!text-slate-1 text-14px items-center justify-center gap-2 pt-8 leading-none">
              <Icons.textline /> {chartInfo.footertext}
            </Flexrow>
          </CardFooter>
        )}
      </Card>
    </>
  );
};
