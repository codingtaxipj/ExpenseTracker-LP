import { useState } from "react";
import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import SingleBarChart from "../charts/SingleBarChart";
import MinMaxStrip from "../strips/min-max-strip";
import Flexrow from "../section/flexrow";
import Flexcol from "../section/flexcol";
import useTotalConfig from "@/hooks/useTotalConfig";
import { CurrentYear, getMonthName } from "@/utilities/calander-utility";
import useMinMax from "@/hooks/useMinMax";

const ExpenseByYearGraph = ({ isExpense }) => {
  const { getTotalExpMonthListOfYear, YearsList } = useTotalConfig();
  const [year, setYear] = useState(CurrentYear());
  const handleYearSelector = (year) => setYear(Number(year));
  const chartData = [
    ...(() => {
      const arr = [];
      for (let i = 0; i < 12; i++) {
        const m = getTotalExpMonthListOfYear(year).find((m) => m.month === i);
        arr.push({
          Title: getMonthName(i, "MMMM"),
          Amount: m?.total ?? 0,
        });
      }
      return arr;
    })(),
  ];
  const { getMM_monthofyear } = useMinMax();
  const monthMAX = getMM_monthofyear(year)?.max ?? { month: 0, Total: 0 };
  const monthMIN = getMM_monthofyear(year)?.min ?? { month: 0, Total: 0 };

  return (
    <>
      <Flexcol>
        <Flexrow>
          <SelectBar>
            <SelectCard isExpense={isExpense} title={"Data of Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={String(CurrentYear())}
                list={YearsList}
              ></SelectFilter>
            </SelectCard>
          </SelectBar>
        </Flexrow>

        <Flexrow>
          <MinMaxStrip data={monthMAX} isExpense isMax />
          <MinMaxStrip data={monthMIN} isExpense isMin />
        </Flexrow>
        <Flexrow>
          <SingleBarChart
            isExpense
            barInfo={{
              data: chartData,
              label: "Expense",
            }}
            chartInfo={{
              title: `Bar Graph - ${year}`,
              subtext: `${isExpense ? "Expenses" : "Income"} in Year by Months`,
              footertext: `Showing Total ${isExpense ? "Expenses" : "Income"} in Year`,
            }}
          ></SingleBarChart>
        </Flexrow>
      </Flexcol>
    </>
  );
};

export default ExpenseByYearGraph;
