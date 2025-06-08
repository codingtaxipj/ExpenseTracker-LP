import { useEffect, useState } from "react";

import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import useAnalysisConfig from "./useAnalysisConfig";
import moment from "moment";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

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
        isPrime: false,
        Amount: list[item]?.total || 0,
      }));
      setChartData(data);
    }
  }, [filter.byYear, totalBy.month]);

  return (
    <>
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-row pb-5">
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
                title: "title",
                subtext: "sub text",
                footertext: "footer text",
              }}
            ></HorizontalBarChart>
          </div>
          <div className="flex flex-1/4 flex-col">
            <div className="flex">
              <h2>Year {filter.byYear} </h2>
            </div>
            <div className="flex pb-5">
              <h2>Expense Breakdown by Month </h2>
            </div>
            <div className="flex flex-col gap-1">
              <Table className="w-max px-5">
                <TableBody className="border-0">
                  {Object.values(chartData).map((item, index) => (
                    <TableRow
                      className="hover:bg-grey-hover border-b-grey-hover h-10"
                      key={index}
                    >
                      <TableCell className="w-0 px-2.5">
                        <div
                          className={`size-4 rounded-xs`}
                          style={{ backgroundColor: colorPalette[index] }}
                        ></div>
                      </TableCell>
                      <TableCell className="w-[10rem] px-2.5">
                        {" "}
                        {moment().month(String(item.Title)).format("MMMM")}
                      </TableCell>
                      <TableCell className="w-[5rem] px-2.5">
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
