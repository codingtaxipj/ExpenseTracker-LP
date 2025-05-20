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
  getEntryDatesData,
  getYearObjArray,
  getMonthObjArray,
  getWeekObjArray,
} from "./utility";
import BarChartSelectFilter from "./BarChartSelectFilter";

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
    arrayOf: null,
    years: 0,
    months: 0,
    weeks: 0,
  });

  useEffect(() => {
    const data = getEntryDatesData(entries);
    setGraphConfig(prev => ({
      ...prev,
      arrayOf: data,
    }));
  }, [entries]);

  useEffect(() => {
    if (GraphConfig.arrayOf !== null) {
      const yearsArr = getYearObjArray(
        GraphConfig.arrayOf.year.start,
        GraphConfig.arrayOf.year.end
      );
      const monthsArr = getMonthObjArray(
        GraphConfig.arrayOf.month.start,
        GraphConfig.arrayOf.month.end
      );
      const weekArr = getWeekObjArray(
        GraphConfig.arrayOf.week.start,
        GraphConfig.arrayOf.week.end
      );
      setGraphConfig(prev => ({
        ...prev,
        years: yearsArr,
        months: monthsArr,
        weeks: weekArr,
      }));
    }
  }, [GraphConfig.arrayOf]);

  //console.log("mD-" + JSON.stringify(GraphConfig.months));

  useEffect(() => {
    if (isExpense) {
      setGraphConfig(prev => ({
        ...prev,
        barColor: "var(--color-expense)",
        Title: "Your Expense",
      }));
    }
  }, [isExpense, filter]);

  useEffect(() => {
    const YearList = getEntriesOfYear(entries, filter.byYear);
    setGraphConfig(prev => ({
      ...prev,
      graphDataByYear: YearList,
    }));
  }, [filter.byYear, entries]);

  useEffect(() => {
    if (showGraphBy === Graph.byYear) {
      const data = sortByYearAsMonths(GraphConfig.graphDataByYear);
      setGraphConfig(prev => ({
        ...prev,
        graphData: data,
        SubText: `Year ${filter.byYear} in Months.`,
        BottomText: "Your Expense By Months in Year",
      }));
    }
    if (showGraphBy === Graph.byMonth.asWeek) {
      const data = sortByMonthAsWeeks(GraphConfig.graphDataByYear, 3);
      setGraphConfig(prev => ({
        ...prev,
        graphData: data,
        SubText: `${moment().month(filter.byMonth).format("MMMM")}, ${
          filter.byYear
        } in Weeks`,
        BottomText: "Your Expense By Weeks in Month ",
      }));
    }
    if (showGraphBy === Graph.byMonth.asDate) {
      const data = sortByMonthAsDates(GraphConfig.graphDataByYear, 3);
      setGraphConfig(prev => ({
        ...prev,
        graphData: data,
        SubText: `Dates of ${moment().month(filter.byMonth).format("MMMM")}, ${
          filter.byYear
        }`,
        BottomText: "Your Expense in Month on Dates ",
      }));
    }

    if (showGraphBy === Graph.byWeek) {
      const data = sortByWeekAsDates(GraphConfig.graphDataByYear, 16);
      setGraphConfig(prev => ({
        ...prev,
        graphData: data,
        SubText: `Dates of ${moment()
          .week(filter.byWeek)
          .format("Do")} Week of Year ${filter.byYear}`,
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

  const handleShowMonthIn = value => {
    if (value === Graph.inMonth.asWeek) {
      setShowGraphBy(Graph.byMonth.asWeek);
    } else {
      setShowGraphBy(Graph.byMonth.asDate);
    }
  };

  const handleSelectYear = value => {
    setFilter(prev => ({
      ...prev,
      byYear: Number(value),
    }));
  };
  const handleSelectMonth = value => {
    setFilter(prev => ({
      ...prev,
      byMonth: Number(value),
    }));
  };
  const handleSelectWeek = value => {
    setFilter(prev => ({
      ...prev,
      byWeek: Number(value),
    }));
  };

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
        <button
          onClick={() => {
            setShowGraphBy(Graph.byWeek);
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs ${
            showGraphBy === Graph.byWeek
              ? isExpense
                ? "bg-expense"
                : "bg-income"
              : isExpense
              ? "hover:bg-expense bg-darkBlack"
              : "hover:bg-income bg-darkBlack"
          }`}
        >
          By Week
        </button>
      </div>

      <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
        <button className="px-2 text-sm">Filter By</button>
        {GraphConfig.years !== 0 && (
          <>
            <div>
              <BarChartSelectFilter
                selectedValue={filter.byYear}
                list={GraphConfig.years}
                onChangeSelect={handleSelectYear}
              />
            </div>
            {(showGraphBy === Graph.byMonth.asWeek ||
              showGraphBy === Graph.byMonth.asDate) && (
              <>
                {GraphConfig.months !== 0 && (
                  <div>
                    <BarChartSelectFilter
                      selectedValue={filter.byMonth}
                      list={GraphConfig.months}
                      onChangeSelect={handleSelectMonth}
                    />
                  </div>
                )}
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
              </>
            )}
            {showGraphBy === Graph.byWeek && GraphConfig.weeks !== 0 && (
              <div>
                <BarChartSelectFilter
                  selectedValue={filter.byWeek}
                  list={GraphConfig.weeks}
                  onChangeSelect={handleSelectWeek}
                />
              </div>
            )}
          </>
        )}
      </div>

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
                tickFormatter={value => value}
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
