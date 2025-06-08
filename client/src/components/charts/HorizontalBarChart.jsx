import { CartesianGrid } from "recharts";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ImParagraphLeft } from "react-icons/im";
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
import { Slice } from "lucide-react";

const HorizontalBarChart = ({
  isPrime,
  barInfo,
  colorPalette,
  chartInfo = {
    title: false,
    subtext: false,
    footertext: false,
  },
}) => {
  const chartData = Object.values(barInfo).map((item, index) => ({
    Title: !isPrime
      ? moment().month(String(item.Title)).format("MMM")
      : item.Title?.slice(0, 3),
    Amount: item.Amount || 0,
    fill: colorPalette[index],
  }));

  const chartConfig = {
    Amount: {
      label: "Expense",
    },
  };

  return (
    <>
      <Card className="bg-greyBlack flex flex-1 flex-col gap-0.5 border-0 px-3 py-9 text-white">
        <CardHeader className="items-center pb-5 pl-10">
          <CardTitle>{chartInfo.title}</CardTitle>
          <CardDescription className="text-dimText">
            {chartInfo.subtext}
          </CardDescription>
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
                right: 20,
              }}
            >
              <CartesianGrid
                stroke="var(--color-greyMedium)"
                vertical={true}
                horizontal={false}
              />
              <YAxis
                dataKey={"Title"}
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
        <CardFooter className="flex-col gap-2">
          <div className="text-dimText flex gap-2 pt-5 text-sm leading-none">
            <ImParagraphLeft /> {chartInfo.footertext}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default HorizontalBarChart;
