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

const SingleBarChart = ({
  barInfo = {
    data: [],
    label: [],
    color: false,
  },
  chartInfo = {
    title: false,
    subtext: false,
    footertext: false,
  },
}) => {
  const chartData = barInfo.data;
  const chartConfig = {
    barChart: {
      label: barInfo.label,
      color: barInfo.color,
    },
  };
  return (
    <>
      <Card className="shadow-shadowBlack border-br1 bg-gradTop2 flex flex-1 flex-col gap-0.5 border px-3 py-9 text-white shadow-md">
        <CardHeader className="items-center pb-5 pl-10">
          {chartInfo.title && (
            <CardTitle>
              <div className="flex flex-row items-center gap-2">
                {chartInfo.title}
                <div className={`size-4 rounded-xs bg-[#5d3fd3]`}></div>
              </div>
            </CardTitle>
          )}
          {chartInfo.subtext && (
            <CardDescription className="text-91">
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
              <CartesianGrid stroke="var(--color-br1)" vertical={false} />
              <XAxis
                dataKey="Title"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="[&_.recharts-cartesian-axis-tick_text]:fill-white"
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="Amount" fill={barInfo.color} radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-[white]"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        {chartInfo.footertext && (
          <CardFooter className="flex-col gap-2">
            <div className="text-91 flex gap-2 pt-5 text-sm leading-none">
              <Icons.textline /> {chartInfo.footertext}
            </div>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default SingleBarChart;
