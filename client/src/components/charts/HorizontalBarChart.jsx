import { CartesianGrid, Pie, PieChart } from "recharts";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import moment from "moment";

const HorizontalBarChart = ({
  barInfo,
  colorPalette,
  chartInfo = {
    title: false,
    subtext: false,
    footertext: false,
  },
}) => {
  const chartData = Object.values(barInfo).map((item, index) => ({
    Title: !item.isPrime
      ? moment().month(String(item.Title)).format("MMMM")
      : item.Title,
    Amount: item.Amount || 0, // fallback in case value is undefined
    fill: colorPalette[index], // mod to prevent index overflow
  }));

  const chartConfig = {
    Amount: {
      label: !barInfo.isPrime
        ? moment().month(String(barInfo.Title)).format("MMMM")
        : barInfo.Title,
      color: "fill",
    },
  };

  return (
    <>
      <Card className="bg-greyBlack border-grey-border flex flex-1 flex-col gap-0.5 border text-white">
        <CardHeader className="items-center pb-0">
          <CardTitle>{chartInfo.title}</CardTitle>
          <CardDescription>{chartInfo.subtext}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className={"max-h-[500px] w-full"}
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              barCategoryGap={5}
              layout="vertical"
              margin={{
                left: 5,
                top: 10,
                bottom: 10,
                right: 5,
              }}
            >
              <CartesianGrid vertical={true} horizontal={false} />
              <YAxis
                dataKey={"Amount"}
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="[&_.recharts-cartesian-axis-tick_text]:fill-white"
                tickFormatter={(value) => value}
              />
              <XAxis dataKey="Amount" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="Amount" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div>{chartInfo.footertext}</div>
        </CardFooter>
      </Card>
    </>
  );
};

export default HorizontalBarChart;
