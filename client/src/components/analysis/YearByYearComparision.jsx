import { FaIndianRupeeSign } from "react-icons/fa6";
import { LuArrowDownUp } from "react-icons/lu";

import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import DoubleLineChart from "../charts/DoubleLineChart";
import useAnalysisConfig from "./useAnalysisConfig";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const YearByYearComparision = ({ isExpense }) => {
  const {
    filter,
    Years,
    handleYearSelector,
    compareToYearSelector,
    totalBy,
    colorPalette,
  } = useAnalysisConfig(isExpense);

  const [chartData, setChartData] = useState({
    Month: "",
    [filter.byYear]: "",
    [filter.toYear]: "",
  });

  useEffect(() => {
    if (Object.keys(totalBy.month).length > 0) {
      const list = totalBy.month[filter.byYear];
      const list2 = totalBy.month[filter.toYear];
      const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => ({
        month: moment().month(item).format("MMMM"),
        [String(filter.byYear)]: list[item]?.total || 0,
        [String(filter.toYear)]: list2[item]?.total || 0,
      }));
      setChartData(data);
    }
  }, [filter.byYear, totalBy.month, filter.toYear]);

  return (
    <>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-row">
          <OuterBar>
            <SelectCard isExpense={isExpense} title={"Compare Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={filter.byYear}
                list={Years}
              ></SelectFilter>
            </SelectCard>
            <SelectCard isExpense={isExpense} title={"To Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={compareToYearSelector}
                defaultValue={filter.toYear}
                list={Years}
              ></SelectFilter>
            </SelectCard>
          </OuterBar>
        </div>
        <div className="flex flex-col gap-2 py-10">
          <div className="flex flex-row items-center gap-2">
            <div className={`size-4 rounded-xs bg-[#f33a6a]`}></div>
            <span> Year {filter.toYear} </span>
            <div className="flex items-center">
              <FaIndianRupeeSign />
              <span>Total Expense : {totalBy.year[filter.toYear]?.total}</span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className={`size-4 rounded-xs bg-[#5d3fd3]`}></div>
            <span> Year {filter.byYear} </span>
            <div className="flex items-center">
              <FaIndianRupeeSign />
              <span>Total Expense : {totalBy.year[filter.byYear]?.total}</span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="flex items-center">% more less</div>
          </div>
        </div>
        <div className="flex flex-row gap-5 pb-5">
          <div className="flex flex-1/4 flex-row">
            <DoubleLineChart
              barInfo={{
                data: chartData,
                lableOne: String(filter.byYear),
                labelTwo: String(filter.toYear),
              }}
              chartInfo={{
                title: `Double Line Graph of Years `,
                subtext: `${isExpense ? "Expenses" : "Income"} Comparision in Years by Months`,
                footertext: `Showing Total ${isExpense ? "Expenses" : "Income"} in Years`,
              }}
            ></DoubleLineChart>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex pb-5">
              <h2>Expense Comparision Breakdown by Month</h2>
            </div>
            <div className="flex flex-col gap-1">
              <div className="border-grey-hover cursor-default overflow-hidden rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-grey-hover bg-grey-hover border-b-grey-hover">
                      <TableHead className="text-dim-text w-fit p-2.5">
                        {" "}
                        Color
                      </TableHead>
                      <TableHead className="text-dim-text w-1/12 p-2.5">
                        Month{" "}
                      </TableHead>
                      <TableHead className="text-dim-text w-1/12 p-2.5">
                        In {filter.toYear}
                      </TableHead>
                      <TableHead className="text-dim-text w-1/12 p-2.5">
                        In {filter.byYear}
                      </TableHead>
                      <TableHead className="text-dim-text w-full p-2.5">
                        Spending
                      </TableHead>
                      <TableHead className="text-dim-text w-fit p-2.5">
                        <LuArrowDownUp />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-0">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
                      <TableRow
                        className="hover:bg-grey-hover border-b-grey-hover h-10"
                        key={item}
                      >
                        <TableCell className="px-2.5">
                          <div
                            className={`size-4 rounded-xs`}
                            style={{ backgroundColor: colorPalette[item] }}
                          ></div>
                        </TableCell>
                        <TableCell className="px-2.5">
                          {moment().month(item).format("MMMM")}:
                        </TableCell>
                        <TableCell className="px-2.5">
                          {totalBy.month[filter.toYear]?.[item]?.total || 0}
                        </TableCell>

                        <TableCell className="px-2.5">
                          {totalBy.month[filter.byYear]?.[item]?.total || 0}
                        </TableCell>
                        <TableCell className="px-2.5">55</TableCell>
                        <TableCell className="px-2.5">55</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YearByYearComparision;
