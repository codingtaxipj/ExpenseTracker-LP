import { useState, useMemo } from "react";
import { Pie, PieChart, Cell, Sector, CartesianGrid } from "recharts";
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

import { Icons } from "../icons";
import { amountFloat } from "../utilityFilter";
import { cn } from "@/lib/utils";
import { cardBgv2 } from "@/global/style";

import Flexrow from "../section/flexrow"; // Added
import Flexcol from "../section/flexcol"; // Added

import { expenseCategories } from "@/global/categories";
import VerticalDevider from "../strips/vertical-devider";
import { GraphTitleSquare } from "../analysis/linear-graph-data";
import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";

// Helper component for the sub-category tile, using your provided JSX
const SubCategoryTile = ({ subCategory, color }) => {
  // Use inline style for dynamic text color
  const colorStyle = {
    color: color || "var(--color-slate-a1)",
  };

  return (
    <Flexrow
      className={cn(
        "text-14px !text-slate-a3 border-slate-a7 hover:border-slate-a9 w-max cursor-pointer items-center gap-2 rounded-sm border px-2.5 py-1 font-medium",
      )}
    >
      <span>
        {/* Use inline style for the icon color */}
        <Icons.checkCircle style={colorStyle} />
      </span>
      {/* Use categoryName from selector, flex-1 to push amount to the right */}
      <span className="flex-1">{subCategory.categoryName}</span>
      <VerticalDevider className="mx-0.25 bg-white" />
      <Flexrow className={"w-max items-center gap-0.75"}>
        <span className="text-12px">
          <Icons.rupee />
        </span>
        {/* Use amount from selector and apply color style */}
        <span style={colorStyle}>{amountFloat(subCategory.amount)}</span>
      </Flexrow>
    </Flexrow>
  );
};

export const PieGraphCode = ({
  graphHeightClass,
  graphInfo = {
    data: [],
    sub: [],
  },
  chartInfo = {
    title: false,
    subtext: false,
    footertext: false,
  },
}) => {
  const chartData = graphInfo.data;
  const allSubCategoryData = graphInfo.sub;

  // State to manage the active/highlighted slice
  const [activeIndex, setActiveIndex] = useState(0);

  // Derive the active prime category entry from the data and index
  const activeEntry = useMemo(
    () => chartData[activeIndex] || null,
    [activeIndex, chartData],
  );

  // --- Filter Sub-Categories based on Active Prime Category ---
  const activeSubCategories = useMemo(() => {
    if (!activeEntry || !allSubCategoryData) return [];
    // Filter subcategories for the active prime category
    // and only show those with an amount > 0, sorted by amount
    return allSubCategoryData.filter((sub) => sub.primeId === activeEntry.id);
  }, [activeEntry, allSubCategoryData]);

  // Create the chartConfig object for the ChartContainer and Tooltip
  const chartConfig = useMemo(() => {
    if (!chartData) return {};
    return expenseCategories.reduce((config, category) => {
      config[category.title] = {
        label: category.title,
        color: category.color || "var(--color-misc)",
      };
      return config;
    }, {});
  }, [expenseCategories, chartData]);

  // Handler for the dropdown select
  const handleSelectChange = (value) => {
    const newIndex = chartData.findIndex((item) => item.categoryName === value);
    if (newIndex !== -1) {
      setActiveIndex(newIndex);
    }
  };

  // Custom Tooltip Formatter
  const myTooltipFormatter = (value, name, item) => {
    const indicatorColor = item.payload.fill || item.color;

    return (
      <div key={item.dataKey} className="flex w-full items-center gap-2">
        <div
          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
          style={{ backgroundColor: indicatorColor }}
        />
        <div className="text-slate-a1 flex flex-1 justify-between leading-none font-medium">
          <span className="pr-1">{name} : </span>
          <span>{amountFloat(value)}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className={cn("flex-1 gap-0.5 px-8 py-10", cardBgv2)}>
        <Flexrow>
          <Flexcol className="gap-1.5">
            {activeEntry ? (
              <Flexrow className={"w-max items-center gap-1.25"}>
                <GraphTitleSquare
                  style={{
                    backgroundColor:
                      chartConfig[activeEntry.categoryName]?.color,
                  }}
                />
                <span className="mr-5">Categories in Expense</span>
                <span
                  style={{
                    color: chartConfig[activeEntry.categoryName]?.color,
                  }}
                >
                  {activeEntry.categoryName}
                </span>

                <span>Rs.</span>
                <span
                  style={{
                    color: chartConfig[activeEntry.categoryName]?.color,
                  }}
                >
                  {amountFloat(activeEntry.amount)}
                </span>
              </Flexrow>
            ) : (
              <span>{chartInfo.title || "Category Details"}</span>
            )}
            <span className="text-slate-a1 !text-14px pt-1.25">
              Tracking categories expenses
            </span>
          </Flexcol>
          <Flexrow>
            <SelectBar>
              <SelectCard isExpense title={"Sort List"}>
                <SelectFilter
                  placeholder={"Select Prime Category"}
                  onValueChange={handleSelectChange}
                  value={activeEntry?.categoryName}
                  list={chartData}
                />
              </SelectCard>
            </SelectBar>
            <Select>
              <SelectTrigger
                className="ml-auto h-7 w-[160px] rounded-lg pl-2.5"
                aria-label="Select a category"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent align="end" className="bg-dark-a1 rounded-xl">
                {chartData.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.categoryName}
                    className="text-slate-a1 data-[highlighted]:bg-dark-a3 rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-xs"
                        style={{
                          backgroundColor:
                            chartConfig[item.categoryName]?.color,
                        }}
                      />
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Flexrow>
        </Flexrow>

        <Flexrow className={"w-max"}>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              // Adjusted size for the left side
              className={cn("h-[400px] w-1/2", graphHeightClass)}
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={myTooltipFormatter}
                      hideLabel
                    />
                  }
                />
                {/* --- UPDATED PIE PROPS per user request --- */}
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="categoryName"
                  innerRadius={50} // Your value
                  strokeWidth={0} // Your value
                  activeIndex={activeIndex}
                  activeShape={({ outerRadius = 0, ...props }) => (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 10} />
                      <Sector
                        {...props}
                        outerRadius={outerRadius + 30}
                        innerRadius={outerRadius + 16}
                      />
                    </g>
                  )}
                  // onMouseEnter removed as requested
                >
                  {/* --- END UPDATE --- */}

                  {/* Apply colors to each cell */}
                  {chartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.id}`}
                      fill={chartConfig[entry.categoryName]?.color}
                      stroke={chartConfig[entry.categoryName]?.color}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>

          <Flexcol className="items-end">
            {activeSubCategories.length > 0 ? (
              activeSubCategories.map((sub) => (
                <SubCategoryTile
                  key={sub.id}
                  subCategory={sub}
                  color={chartConfig[activeEntry.categoryName]?.color}
                />
              ))
            ) : (
              <div className="text-slate-a4 flex h-full items-center justify-center">
                No sub-category expenses for {activeEntry?.categoryName}.
              </div>
            )}
          </Flexcol>
        </Flexrow>

        {chartInfo.footertext && (
          <CardFooter className="text-slate-a4 !text-14px flex-row items-center justify-center gap-2 pt-2.5">
            <Icons.textline /> {chartInfo.footertext}
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default PieGraphCode;
