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
  Graph,
  sortByMonthAsWeeks,
  sortByMonthAsDates,
  sortByWeekAsDates,
  getEntriesOfYear,
  getYearOfDate,
  getMonthOfDate,
  getWeekOfDate,
} from "./utility";

const BarChartSection = ({ entries, isExpense }) => {
  const [filter, setFilter] = useState({
    byYear: moment().year(),
    byMonth: moment().month(),
    byWeek: moment().week(),
  });
  const [showGraphBy, setShowGraphBy] = useState(Graph.byYear);
  const [GraphConfig, setGraphConfig] = useState({
    Title: "",
    SubText: "",
    BottomText: "",
    barLabel: "",
    barColor: "",
    barBtnStyle: "",
    graphData: [],
    graphDataByYear: [],
    firstEntry: "",
    lastEntry: "",
  });

  useEffect(() => {
    const FY = getYearOfDate(entries[0].entryDate);
    const LY = getYearOfDate(entries[entries.length - 1].entryDate);
    const LM = getMonthOfDate(entries[entries.length - 1].entryDate);
    const LW = getWeekOfDate(entries[entries.length - 1].entryDate);
    setGraphConfig((prev) => ({
      ...prev,
      firstEntry: {
        year: FY,
      },
      lastEntry: {
        year: LY,
        month: LM,
        week: LW,
      },
    }));
  }, [entries]);

  useEffect(() => {
    if (isExpense) {
      setGraphConfig((prev) => ({
        ...prev,
        barColor: "var(--color-expense)",
        Title: "Your Expense",
      }));
    }
  }, [isExpense, filter]);

  useEffect(() => {
    const YearList = getEntriesOfYear(entries, filter.byYear);
    setGraphConfig((prev) => ({
      ...prev,
      graphDataByYear: YearList,
    }));
  }, [filter.byYear, entries]);

  useEffect(() => {
    if (showGraphBy === Graph.byYear) {
      const data = sortByYearAsMonths(GraphConfig.graphDataByYear);
      setGraphConfig((prev) => ({
        ...prev,
        graphData: data,
        SubText: `Year ${filter.byYear} in Months.`,
        BottomText: "Your Expense By Months in Year",
      }));
    }
    if (showGraphBy === Graph.byMonth.asWeek) {
      const data = sortByMonthAsWeeks(GraphConfig.graphDataByYear, 3);
      setGraphConfig((prev) => ({
        ...prev,
        graphData: data,
        SubText: `${moment().month(filter.byMonth).format("MMMM")}, ${filter.byYear} in Weeks`,
        BottomText: "Your Expense By Weeks in Month ",
      }));
    }
    if (showGraphBy === Graph.byMonth.asDate) {
      const data = sortByMonthAsDates(GraphConfig.graphDataByYear, 3);
      setGraphConfig((prev) => ({
        ...prev,
        graphData: data,
        SubText: `Dates of ${moment().month(filter.byMonth).format("MMMM")}, ${filter.byYear}`,
        BottomText: "Your Expense in Month on Dates ",
      }));
    }

    if (showGraphBy === Graph.byWeek) {
      const data = sortByWeekAsDates(GraphConfig.graphDataByYear, 16);
      setGraphConfig((prev) => ({
        ...prev,
        graphData: data,
        SubText: `Dates of ${moment().week(filter.byWeek).format("Do")} Week of Year ${filter.byYear}`,
        BottomText: "Your Expense in Week by Dates ",
      }));
    }
  }, [entries, filter, showGraphBy, GraphConfig.graphDataByYear]);

  const chartConfig = {
    barChart: {
      label: GraphConfig.barLabel,
      color: GraphConfig.barColor,
    },
  };
  const chartData = GraphConfig.graphData;

  const handleChangeYear = (value) => {
    setFilter((prev) => ({ ...prev, byYear: Number(value) }));
    console.log("Selected Year : " + value);
  };
  const handleShowMonthIn = (value) => {
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
          className={`rounded-sm border-0 px-5 py-1.5 text-xs ${showGraphBy === Graph.byYear ? (isExpense ? "bg-expense" : "bg-income") : isExpense ? "hover:bg-expense bg-darkBlack" : "hover:bg-income bg-darkBlack"}`}
        >
          By Year
        </button>
        <button
          onClick={() => {
            setShowGraphBy(Graph.byMonth.asWeek);
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs ${showGraphBy === Graph.byMonth.asWeek || showGraphBy === Graph.byMonth.asDate ? (isExpense ? "bg-expense" : "bg-income") : isExpense ? "hover:bg-expense bg-darkBlack" : "hover:bg-income bg-darkBlack"}`}
        >
          By Month
        </button>
        <button
          onClick={() => {
            setShowGraphBy(Graph.byWeek);
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs ${showGraphBy === Graph.byWeek ? (isExpense ? "bg-expense" : "bg-income") : isExpense ? "hover:bg-expense bg-darkBlack" : "hover:bg-income bg-darkBlack"}`}
        >
          By Week
        </button>
      </div>
      {showGraphBy === Graph.byYear && (
        <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
          <button className="px-2 text-sm">Filter By</button>
          <div>
            <Select defaultValue="2025" onValueChange={handleChangeYear}>
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
      {(showGraphBy === Graph.byMonth.asWeek ||
        showGraphBy === Graph.byMonth.asDate) && (
        <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
          <button className="px-2 text-sm">Filter By</button>
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
        </div>
      )}

      {showGraphBy === Graph.byWeek && (
        <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
          <button className="px-2 text-sm">Filter By</button>
          <div>
            <Select defaultValue="2025" onValueChange={handleChangeYear}>
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
                <SelectValue placeholder="Select Week" />
              </SelectTrigger>
              <SelectContent className="w-40">
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <Card className="bg-greyBlack border-grey-border border text-white">
        <CardHeader>
          <CardTitle>{GraphConfig.Title}</CardTitle>
          <CardDescription>{GraphConfig.SubText}</CardDescription>
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
            {GraphConfig.BottomText}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BarChartSection;
