import OuterBar from "../selectFilter/OuterBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";

import useAnalysisConfig from "./useAnalysisConfig";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

import { Checkbox } from "../ui/checkbox";
import InfoStrip from "./InfoStrip";
import SectionHeader from "../section-header";
import { CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Icons } from "../icons";

const CategoryAnalysis = ({ isExpense }) => {
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
      <div className="flex w-full flex-col gap-5 px-10 pb-25">
        <SectionHeader title="Expenses Analysis By By Categories" isAnalysis />
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

        <div className="shadow-shadowBlack border-br1 bg-gradTop2 flex flex-1 flex-col gap-0.5 rounded-xl border p-10 text-white shadow-md">
          <CardHeader className={"!px-0 pb-5"}>
            <CardTitle>Progres Bar Chart - 2025</CardTitle>
            <CardDescription className="text-91">
              Expenses in Year by Prime Categories
            </CardDescription>
          </CardHeader>
          <Table className="text-14 w-full">
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
                        "data-[state=checked]:bg-ggbg border-dimText hover:cursor-pointer"
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
          <CardFooter className="flex-col gap-2">
            <div className="text-91 flex gap-2 pt-5 text-sm leading-none">
              <Icons.textline /> Showing Total Expenses in Year
            </div>
          </CardFooter>
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
        <div className="flex flex-wrap gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <InfoStrip key={item} color="bg-expbg" amount={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryAnalysis;
