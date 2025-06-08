import { TrendingUp } from "lucide-react";
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
import { ImParagraphLeft } from "react-icons/im";

const DoubleLineChart = ({ barInfo, chartInfo }) => {
  const chartData = barInfo.data;
  const chartConfig = {
    [barInfo.lableOne]: {
      label: barInfo.lableOne,
      color: "#5d3fd3",
    },
    [barInfo.labelTwo]: {
      label: barInfo.labelTwo,
      color: "#f33a6a",
    },
  };
  return (
    <>
      <Card className="bg-greyBlack flex flex-1 flex-col gap-0.5 border-0 px-3 py-9 text-white">
        <CardHeader className="items-center pb-5 pl-10">
          <CardTitle>
            <div className="flex flex-row items-center gap-2">
              {chartInfo.title}
              <div className={`size-4 rounded-xs bg-[#5d3fd3]`}></div>
              {barInfo.lableOne}
              <div className={`size-4 rounded-xs bg-[#f33a6a]`}></div>
              {barInfo.labelTwo}
            </div>
          </CardTitle>
          <CardDescription className="text-dimText">
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
              <CartesianGrid
                stroke="var(--color-greyMedium)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="[&_.recharts-cartesian-axis-tick_text]:fill-white"
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey={barInfo.lableOne}
                type="monotone"
                stroke="#5d3fd3"
                strokeWidth={2}
                dot={true}
              />
              <Line
                dataKey={barInfo.labelTwo}
                type="monotone"
                stroke="#f33a6a"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="text-dimText flex gap-2 pt-5 text-sm leading-none">
            <ImParagraphLeft /> {chartInfo.footertext}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default DoubleLineChart;
