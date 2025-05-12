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
import { sortByMonth, sortByYear } from "./utility";

const BarChartSection = ({ entries, isExpense }) => {
  const currentYear = moment().year();

  const [sortedData, updateSortedData] = useState([]);
  const [shortDataBy, setSortDataBy] = useState(currentYear);
  const [showBy, updateShowBy] = useState("year");
  const [config, setConfig] = useState({});

  const selectedFilterBtn = (btn) => {
    if (showBy === btn) return "bg-expense";
    else return "bg-darkBlack hover:bg-expense";
  };

  useEffect(() => {
    if (isExpense) {
      setConfig({
        barLabel: "Expense",
        barColor: "var(--color-expense)",
        cardTitle: "Your Expense",
      });
    } else {
      setConfig({
        barLabel: "Income",
        barColor: "var(--color-income)",
        cardTitle: "Your Income",
        cardBottomText: "Your Income This Year by Month",
      });
    }
  }, [isExpense]);

  const showChartBy = (filterBy) => {
    switch (filterBy) {
      case "year": {
        setConfig((prev) => ({
          ...prev,
          cardSubTitle: "Month by Month - " + moment().year(),
          cardBottomText: `Your Expense of Year ${moment().year()} by Month`,
        }));
        break;
      }
      case "month": {
        const val = moment().month();
        setConfig((prev) => ({
          ...prev,
          cardSubTitle: "Week by Week - " + moment().month(val).format("MMMM"),
          cardBottomText: `Your Expense of Month ${moment().month(val).format("MMMM")} by Weeks`,
        }));
        break;
      }
      case "week": {
        const val = moment().week();
        setConfig((prev) => ({
          ...prev,
          cardSubTitle:
            "Day by Day - " + moment().week(val).format("wo") + " Week",
          cardBottomText: `Your Expense of Week ${moment().week(val).format("wo")} Week by Days`,
        }));
        break;
      }
    }
  };

  useEffect(() => {
    if (showBy === "year") {
      const data = sortByYear(entries, shortDataBy);
      updateSortedData(data);
    }
    if (showBy === "month") {
      const data = sortByMonth(entries, shortDataBy);
      updateSortedData(data);
    }
    showChartBy(showBy);
  }, [showBy, shortDataBy, entries]);

  const chartConfig = {
    barChart: {
      label: config.label,
      color: config.barColor,
    },
  };
  const chartData = sortedData;

  return (
    <>
      <div className="bg-grey-hover mb-5 flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
        <button className="px-2 text-sm">Show Chart</button>
        <button
          onClick={() => {
            setSortDataBy(currentYear);
            updateShowBy("year");
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs ${selectedFilterBtn("year")}`}
        >
          By Year
        </button>
        <button
          onClick={() => {
            setSortDataBy(3);
            updateShowBy("month");
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs ${selectedFilterBtn("month")}`}
        >
          By Month
        </button>
        <button
          onClick={() => {
            updateShowBy("week");
          }}
          className={`rounded-sm border-0 px-5 py-1.5 text-xs ${selectedFilterBtn("week")}`}
        >
          By Week
        </button>
        <div>
          <Select>
            <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
              <SelectValue placeholder="Sort By Type" />
            </SelectTrigger>
            <SelectContent className="w-40">
              <SelectItem value="subCat">Category</SelectItem>
              <SelectItem value="primeCat">Category From</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="bg-greyBlack border-grey-border border text-white">
        <CardHeader>
          <CardTitle>{config.cardTitle}</CardTitle>
          <CardDescription>{config.cardSubTitle}</CardDescription>
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
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="Amount" fill={config.barColor} radius={8}>
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
            {config.cardBottomText}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BarChartSection;
