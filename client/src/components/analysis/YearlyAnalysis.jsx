import { useEffect, useState } from "react";

import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import useAnalysisConfig from "./useAnalysisConfig";
import moment from "moment";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { FaCalendarCheck } from "react-icons/fa";

const YearlyAnalysis = ({ isExpense }) => {
  const { filter, Years, handleYearSelector, totalBy, colorPalette } =
    useAnalysisConfig(isExpense);

  const [chartData, setChartData] = useState({
    Title: [],
    Amount: 0,
  });

  useEffect(() => {
    if (Object.keys(totalBy.month).length > 0) {
      const list = totalBy.month[filter.byYear];

      const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => ({
        Title: item,

        Amount: list[item]?.total || 0,
      }));
      setChartData(data);
    }
  }, [filter.byYear, totalBy.month]);

  return (
    <>
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-row">
          <OuterBar>
            <SelectCard isExpense={isExpense} title={"By Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={filter.byYear}
                list={Years}
              ></SelectFilter>
            </SelectCard>
          </OuterBar>
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-3/4">
            <HorizontalBarChart
              colorPalette={colorPalette}
              barInfo={chartData}
              chartInfo={{
                title: `Bar Graph - ${filter.byYear}`,
                subtext: `${isExpense ? "Expenses" : "Income"} in Year by Months`,
                footertext: `Showing Total ${isExpense ? "Expenses" : "Income"} in Year`,
              }}
            ></HorizontalBarChart>
          </div>
          <div className="flex flex-1/4 flex-col justify-center pl-5">
            <div className="flex flex-row items-center gap-2 pb-1 text-lg font-medium">
              <FaCalendarCheck />
              <h2>Year {filter.byYear} </h2>
            </div>
            <div className="text-14 text-dimText flex pb-2.5">
              <h2>{isExpense ? "Expenses" : "Income"} Breakdown by Month </h2>
            </div>
            <div className="flex flex-col gap-1">
              <Table className="text-16 w-max">
                <TableBody>
                  {Object.values(chartData).map((item, index) => (
                    <TableRow
                      className="hover:bg-greyBlack border-b-greyMedium h-10"
                      key={index}
                    >
                      <TableCell>
                        <div
                          className={`size-4 rounded-xs`}
                          style={{ backgroundColor: colorPalette[index] }}
                        ></div>
                      </TableCell>
                      <TableCell className="w-[8rem] text-left">
                        {moment().month(String(item.Title)).format("MMMM")}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.Amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YearlyAnalysis;
