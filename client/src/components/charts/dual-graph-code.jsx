import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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

export const DualGraphCode = ({ barInfo, chartInfo }) => {
  const chartData = barInfo.data;
  const chartConfig = {
    [barInfo.lableOne]: {
      label: barInfo.lableOne,
      color: "var(--color-year1)",
    },
    [barInfo.labelTwo]: {
      label: barInfo.labelTwo,
      color: "var(--color-year2)",
    },
  };
  return (
    <>
      <Card className={cn("flex-1 gap-0.5 px-3 py-9", cardBgv2)}>
        <CardHeader className="items-center pb-5 pl-10">
          <CardTitle>
            <div className="flex flex-row items-center gap-2">
              {chartInfo.title}
            </div>
          </CardTitle>
          <CardDescription className="text-slate-a1 pt-1.25">
            {chartInfo.subtext}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className={"max-h-[500px] w-full"}
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 20,
                right: 20,
              }}
            >
              <CartesianGrid stroke="var(--color-dark-a6)" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="[&_.recharts-cartesian-axis-tick_text]:fill-slate-a4"
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey={barInfo.lableOne}
                type="monotone"
                stroke={"var(--color-year1)"}
                strokeWidth={2}
                dot={true}
              />
              <Line
                dataKey={barInfo.labelTwo}
                type="monotone"
                stroke={"var(--color-year2)"}
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="text-slate-a1 text-14px flex gap-2 pt-8 leading-none">
            <Icons.textline /> {chartInfo.footertext}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
