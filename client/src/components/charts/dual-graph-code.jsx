import { Area, CartesianGrid, XAxis, AreaChart } from "recharts";
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
import { cardBgv2 } from "@/global/style";
import { cn } from "@/lib/utils";
import { amountFloat } from "../utilityFilter";

export const DualGraphCode = ({
  isDashboard,
  graphInfo = {
    data: [],
    expense: "Expense",
    expColor: "var(--color-exp-a1)",
    income: "Income",
    incColor: "var(--color-inc-a1)",
  },
  chartInfo = {
    title: false,
    subtext: false,
    footertext: false,
  },
}) => {
  const chartData = graphInfo.data;
  console.log("CDDD", chartData, "dash=", isDashboard);

  const chartConfig = {
    [graphInfo.expense]: {
      label: graphInfo.expense,
      color: "var(--color-exp-a1)",
    },
    [graphInfo.income]: {
      label: graphInfo.income,
      color: "var(--color-inc-a2)",
    },
  };

  const myLabelFormatter = (value, payload) => {
    // Removed the color styling as it's ambiguous for the shared label
    return <span className="font-medium">For : {value}</span>;
  };

  const myTooltipFormatter = (value, name, item, index, payload) => {
    // FIX: Get the correct color from the 'item' object
    const indicatorColor = item.color || item.payload?.fill || item.stroke;

    return (
      <div key={item.dataKey} className="flex w-full items-center gap-2">
        {/* Indicator */}
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
          // FIX: Use the color from the item
          style={{ backgroundColor: indicatorColor }}
        />
        {/* Label and Value */}
        <div className="text-slate-a1 flex flex-1 justify-between leading-none font-medium">
          {/* Use 'name' passed by formatter, fallback to item.name */}
          <span className="pr-1">{name || item.name} : </span>
          {/* Format the value */}
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
            className={"max-h-[250px] w-full"}
          >
            {isDashboard && (
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
                  dataKey={graphInfo.expense}
                  type="monotone"
                  fill={graphInfo.expColor}
                  fillOpacity={0.4}
                  stroke={graphInfo.expColor}
                  stackId="a"
                />
                <Area
                  dataKey={graphInfo.income}
                  type="monotone"
                  fill={graphInfo.incColor}
                  fillOpacity={0.4}
                  stroke={graphInfo.incColor}
                  stackId="a"
                />
              </AreaChart>
            )}
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
