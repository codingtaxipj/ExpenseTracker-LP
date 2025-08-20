import moment from "moment";
import { useEffect, useState } from "react";

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
import {
  sortByYearAsMonths,
  sortByMonthAsWeeks,
  sortByMonthAsDates,
  sortByWeekAsDates,
  Graph,
} from "./utility";

const BarChartSection = ({ entries, isExpense }) => {
  const [filter, setFilter] = useState({
    byYear: moment().year(),
    byMonth: moment().month(),
    byWeek: moment().week(),
  });
  const [showGraphBy, setShowGraphBy] = useState(Graph.byYear);
  const [showMonthGraph, setShowMonthGraph] = useState(Graph.monthInWeeks);
  const [GraphConfig, setGraphConfig] = useState({});

  useEffect(() => {
    if (isExpense) {
      setGraphConfig({
        barLabel: "Expense",
        barColor: "var(--color-expense)",
        cardTitle: "Your Expense",
      });
    } else {
      setGraphConfig({
        barLabel: "Income",
        barColor: "var(--color-income)",
        cardTitle: "Your Income",
        cardBottomText: "Your Income This Year by Month",
      });
    }
  }, [isExpense]);

  useEffect(() => {
    if (showGraphBy === Graph.byYear) {
      const data = sortByYearAsMonths(entries, filter.byYear);
      setGraphConfig({
        graphData: data,
      });
    }
    if (showGraphBy === Graph.byMonth.asWeek) {
      const data = sortByMonthAsWeeks(entries, filter.byYear, filter.byMonth);
      setGraphConfig({
        graphData: data,
      });
    }
    if (showGraphBy === Graph.byMonth.asDate) {
      const data = sortByMonthAsDates(entries, filter.byYear, filter.byMonth);
      setGraphConfig({
        graphData: data,
      });
    }
    if (showGraphBy === Graph.byWeek) {
      const data = sortByWeekAsDates(entries, filter.byYear, filter.byWeek);
      setGraphConfig({
        graphData: data,
      });
    }
  }, [entries, filter, showGraphBy]);

  const chartConfig = {
    barChart: {
      label: GraphConfig.label,
      color: GraphConfig.barColor,
    },
  };
  const chartData = GraphConfig.graphData || [];

  const handleSelectMonthChange = (value) => {
  
    if (value === Graph.inMonth.asWeek) {
      setShowGraphBy(Graph.byMonth.asWeek);
    } else {
      setShowGraphBy(Graph.byMonth.asDate);
    }
  };

  return (
    <>
      <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
        <button className="px-2 text-sm">Show Chart</button>
        <button
          onClick={() => {
            setShowGraphBy(Graph.byYear);
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs`}
        >
          By Year
        </button>
        <button
          onClick={() => {
            setShowGraphBy(Graph.byMonth.asWeek);
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs`}
        >
          By Month
        </button>
        <button
          onClick={() => {
            setShowGraphBy(Graph.byWeek);
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs`}
        >
          By Week
        </button>
      </div>
      {showGraphBy === Graph.byYear && (
        <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
          <button className="px-2 text-sm">Filter By</button>
          <div>
            <Select defaultValue="2025">
              <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                <SelectValue placeholder="Sort By Type" />
              </SelectTrigger>
              <SelectContent className="w-40">
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {showGraphBy === Graph.byMonth && (
        <>
          <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
            <div>
              <Select
                defaultValue="mWeeks"
                onValueChange={handleSelectMonthChange}
              >
                <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                  <SelectValue placeholder="Sort By Type" />
                </SelectTrigger>
                <SelectContent className="w-40">
                  <SelectItem value="mWeeks">Show in Weeks</SelectItem>
                  <SelectItem value="mDays">Show in Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button className="px-2 text-sm">Filter By</button>
            <div>
              <Select defaultValue="2025">
                <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                  <SelectValue placeholder="Sort By Type" />
                </SelectTrigger>
                <SelectContent className="w-40">
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent className="w-40">
                  <SelectItem value="1">January</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}

      {showGraphBy === Graph.byWeek && (
        <>
          <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
            <button className="px-2 text-sm">Filter By</button>
            <div>
              <Select>
                <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent className="w-40">
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent className="w-40">
                  <SelectItem value="1">January</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                  <SelectValue placeholder="Select Week" />
                </SelectTrigger>
                <SelectContent className="w-40">
                  <SelectItem value="1">1st Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}

      <Card className="bg-greyBlack border-grey-border border text-white">
        <CardHeader>
          <CardTitle>{GraphConfig.cardTitle}</CardTitle>
          <CardDescription>{GraphConfig.cardSubTitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
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
            {GraphConfig.cardBottomText}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BarChartSection;
