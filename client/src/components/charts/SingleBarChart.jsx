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
import { ImParagraphLeft } from "react-icons/im";

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
      <Card className="bg-greyBlack flex flex-1 flex-col gap-0.5 border-0 px-3 py-9 text-white">
        <CardHeader className="items-center pb-5 pl-10">
          {chartInfo.title && <CardTitle>{chartInfo.title}</CardTitle>}
          {chartInfo.subtext && (
            <CardDescription className="text-dimText">
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
              <CartesianGrid
                stroke="var(--color-greyMedium)"
                vertical={false}
              />
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
          <CardFooter className="flex-col gap-2">
            <div className="text-dimText flex gap-2 pt-5 text-sm leading-none">
              <ImParagraphLeft /> {chartInfo.footertext}
            </div>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default SingleBarChart;
