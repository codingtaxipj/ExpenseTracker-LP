import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";

import useAnalysisConfig from "./useAnalysisConfig";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

import { FaCalendarCheck } from "react-icons/fa";

import { Slider } from "../ui/slider";

const PrimeCategoryYearlyAnalysis = ({ isExpense }) => {
  const {
    filter,
    Years,
    handleYearSelector,
    totalBy,
    categories,
    categoryColors,
  } = useAnalysisConfig(isExpense);

  const [chartData, setChartData] = useState({
    Title: [],
    Amount: 0,
  });

  useEffect(() => {
    if (Object.keys(totalBy.prime).length > 0) {
      const list = totalBy.prime[filter.byYear];
      if (!list) return;

      const data = categories.prime.map((item) => ({
        Title: item,

        Amount: list?.[item]?.total || 0,
      }));
      setChartData(data);
    }
  }, [filter.byYear, totalBy.prime, categories.prime]);

  const spendBar = (inputAmount, color) => {
    const total = totalBy?.year[filter.byYear]?.total;
    const p = Math.round((inputAmount / total) * 100);
    return {
      width: `${p}%`,
      height: "1rem",
      backgroundColor: color,
    };
  };

  return (
    <>
      <div className="flex w-full flex-col gap-5 p-5">
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
          <div className="flex flex-1/4 flex-col justify-center pl-5">
            <div className="flex flex-row items-center gap-2 pb-1 text-lg font-medium">
              <FaCalendarCheck />
              <h2>Year {filter.byYear} </h2>
            </div>
            <div className="text-14 text-dimText flex pb-2.5">
              <h2>
                {isExpense ? "Expenses" : "Income"} Breakdown by Prime
                Categories{" "}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <Table className="text-16 w-full">
                <TableBody className="border-0">
                  {Object.values(chartData).map((item, index) => (
                    <TableRow
                      className="hover:bg-greyBlack border-b-greyMedium h-10"
                      key={index}
                      onClick={() => console.log(item.Title)}
                    >
                      <TableCell className="w-[5rem] px-2.5">
                        <Slider defaultValue={[33]} max={100} step={1} />
                      </TableCell>
                      <TableCell className="w-[8rem] text-left">
                        {item.Title}
                      </TableCell>
                      <TableCell className="w-[5rem] text-right">
                        {item.Amount}
                      </TableCell>
                      <TableCell>
                        <div
                          style={spendBar(item.Amount, categoryColors[index])}
                          className="rounded-md"
                        ></div>
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

export default PrimeCategoryYearlyAnalysis;
