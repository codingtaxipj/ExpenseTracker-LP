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
      <Card className="bg-greyBlack border-grey-border flex flex-1 flex-col gap-0.5 border text-white">
        <CardHeader>
          {chartInfo.title && <CardTitle>{chartInfo.title}</CardTitle>}
          {chartInfo.subtext && (
            <CardDescription>{chartInfo.subtext}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className={"max-h-[450px] w-full"}
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 50,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="Title"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="Amount" fill="var(--color-barChart)" radius={8}>
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
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex w-full justify-center gap-2 leading-none font-medium">
              {chartInfo.footertext}
            </div>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default SingleBarChart;
