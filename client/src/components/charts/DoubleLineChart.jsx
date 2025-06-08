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
      <Card className="bg-greyBlack border-grey-border flex flex-1 flex-col border text-white">
        <CardHeader>
          <CardTitle>{chartInfo.title}</CardTitle>
          <CardDescription>{chartInfo.subtext}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div>{chartInfo.footertext}</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default DoubleLineChart;
