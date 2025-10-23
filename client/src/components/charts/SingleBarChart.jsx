import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";

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
import Flexrow from "../section/flexrow";

const SingleBarChart = ({
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
  const chartConfig = {
    barChart: {
      label: barInfo.label,
      color: color,
    },
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
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="amount" fill={color} radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-slate-a1"
                  fontSize={12}
                  formatter={(value) => amountFloat(value)}
                />
              </Bar>
            </BarChart>
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

export default SingleBarChart;
