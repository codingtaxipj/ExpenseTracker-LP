//shacdn
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import BarChartSelectFilter from "./BarChartSelectFilter";
import useBarCharConfig from "./useBarCharConfig";

const BarChartSection = ({ entries, isExpense }) => {
  const {
    Graph,
    filter,
    showGraphBy,
    setShowGraphBy,
    GraphConfig,
    handleShowMonthIn,
    handleSelectYear,
    handleSelectMonth,
  } = useBarCharConfig(entries, isExpense);
  const chartConfig = {
    barChart: {
      label: GraphConfig.barLabel,
      color: GraphConfig.barColor,
    },
  };
  const chartData = GraphConfig.graphData;

  const setDefaultYear =
    GraphConfig.years.find((item) => item === filter.byYear) ||
    GraphConfig.years[0];
  const setDefaultMonth =
    GraphConfig.months.find((item) => item === filter.byMonth) ||
    GraphConfig.months[0];

  return (
    <>
      <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
        <button className="px-2 text-sm">Show Chart</button>
        <button
          onClick={() => {
            setShowGraphBy(Graph.byYear);
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs ${
            showGraphBy === Graph.byYear
              ? isExpense
                ? "bg-expense"
                : "bg-income"
              : isExpense
                ? "hover:bg-expense bg-darkBlack"
                : "hover:bg-income bg-darkBlack"
          }`}
        >
          By Year
        </button>
        <button
          onClick={() => {
            setShowGraphBy(Graph.byMonth.asWeek);
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs ${
            showGraphBy === Graph.byMonth.asWeek ||
            showGraphBy === Graph.byMonth.asDate
              ? isExpense
                ? "bg-expense"
                : "bg-income"
              : isExpense
                ? "hover:bg-expense bg-darkBlack"
                : "hover:bg-income bg-darkBlack"
          }`}
        >
          By Month
        </button>
      </div>
      {showGraphBy === Graph.byYear && GraphConfig.years !== 0 && (
        <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
          <button className="px-2 text-sm">Filter By</button>
          <div>
            <BarChartSelectFilter
              defaultSelected={setDefaultYear}
              list={GraphConfig.years}
              handleSelect={handleSelectYear}
            />
          </div>
        </div>
      )}
      {(showGraphBy === Graph.byMonth.asWeek ||
        showGraphBy === Graph.byMonth.asDate) && (
        <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
          <button className="px-2 text-sm">Show As</button>
          <div>
            <Select
              defaultValue={Graph.inMonth.asWeek}
              onValueChange={handleShowMonthIn}
            >
              <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                <SelectValue placeholder="Sort By Type" />
              </SelectTrigger>
              <SelectContent className="w-40">
                <SelectItem value={Graph.inMonth.asWeek}>
                  Show in Weeks
                </SelectItem>
                <SelectItem value={Graph.inMonth.asDate}>
                  Show in Dates
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {GraphConfig.months !== 0 && GraphConfig.years !== 0 && (
            <>
              <button className="px-2 text-sm">Filter By</button>
              <div>
                <BarChartSelectFilter
                  defaultSelected={setDefaultYear}
                  list={GraphConfig.years}
                  handleSelect={handleSelectYear}
                />
              </div>
              <div>
                <BarChartSelectFilter
                  defaultSelected={setDefaultMonth}
                  list={GraphConfig.months}
                  handleSelect={handleSelectMonth}
                  listforMonth={true}
                />
              </div>
            </>
          )}
        </div>
      )}

      <Card className="bg-greyBlack border-grey-border border text-white">
        <CardHeader>
          <CardTitle>{GraphConfig.barLabel}</CardTitle>
          <CardDescription>{GraphConfig.SubText}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
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
              <Bar dataKey="Amount" fill={GraphConfig.barColor} radius={8}>
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
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex w-full justify-center gap-2 leading-none font-medium">
            {GraphConfig.BottomText}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BarChartSection;
