import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";

import useAnalysisConfig from "./useAnalysisConfig";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

import { FaCalendarCheck } from "react-icons/fa";
import { Checkbox } from "../ui/checkbox";
import InfoStrip from "./InfoStrip";

const PrimeCategoryYearlyAnalysis = ({ isExpense }) => {
  const {
    filter,
    Months,
    Years,
    handleYearSelector,
    handleMonthSelector,
    totalBy,
    categories,
    categoryColors,
  } = useAnalysisConfig(isExpense);

  const [chartData, setChartData] = useState({
    Title: [],
    Amount: 0,
  });
  const [selected, setSelected] = useState(0);
  const handleChange = (index) => {
    if (selected === index) {
      setSelected(null); // uncheck if already selected
    } else {
      setSelected(index);
    }
  };

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
        <div className="flex">
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

        <div className="bg-greyBlack flex gap-1 rounded-2xl p-10">
          <Table className="text-16 w-full">
            <TableBody className="border-0">
              {Object.values(chartData).map((item, index) => (
                <TableRow
                  className="hover:bg-greyBlack border-b-greyMedium h-10"
                  key={index}
                >
                  <TableCell className="w-[2.5rem] !px-2.5 text-center">
                    <Checkbox
                      checked={selected === index}
                      onCheckedChange={() => handleChange(index)}
                      className={
                        "data-[state=checked]:bg-expense border-dimText"
                      }
                    ></Checkbox>
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

        <div className="flex">
          <OuterBar>
            <SelectCard isExpense={isExpense} title={"In Month Of"}>
              <SelectFilter
                placeholder={"Select Month"}
                onValueChange={handleMonthSelector}
                isMonthSelect={true}
                defaultValue={filter.byMonth}
                list={Months}
              ></SelectFilter>
            </SelectCard>
          </OuterBar>
        </div>
        <div className="flex gap-2.5 flex-wrap">
          <InfoStrip></InfoStrip>
          <InfoStrip></InfoStrip>
          <InfoStrip></InfoStrip>
          <InfoStrip></InfoStrip>
          <InfoStrip></InfoStrip>
          <InfoStrip></InfoStrip>
          <InfoStrip></InfoStrip>
          <InfoStrip></InfoStrip>
          <InfoStrip></InfoStrip>
        </div>
      </div>
    </>
  );
};

export default PrimeCategoryYearlyAnalysis;
