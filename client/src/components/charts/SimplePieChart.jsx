import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
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
} from "@/components/ui/chart.jsx";
import moment from "moment";

const SimplePieChart = ({ barInfo, colorPalette }) => {
  const chartData = Object.values(barInfo).map((item, index) => ({
    Title: moment().month(String(item.Title)).format("MMMM"),
    Amount: item.Amount || 0, // fallback in case value is undefined
    fill: colorPalette[index], // mod to prevent index overflow
  }));

  const chartConfig = {
    Amount: {
      label: "Amount",
      color: "fill",
    },
  };

  return (
    <>
      <Card className="bg-greyBlack border-grey-border flex flex-1 flex-col gap-0.5 border text-white">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart : Year 2025</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[360px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="Amount" nameKey="Title" />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default SimplePieChart;
