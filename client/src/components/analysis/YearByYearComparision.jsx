import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import DoubleLineChart from "../charts/DoubleLineChart";

import TotalCard from "../cards/TotalCard";
import YearCompareCard from "./YearCompareCard";
import InfoStrip from "../strips/info-strip";
import MinMaxStrip from "../strips/min-max-strip";
import BudgetStrip from "../strips/budget-strip";
import BudgetMonth from "./BudgetMonth";

import SectionTitle from "../section/section-title";

const YearByYearComparision = ({ isExpense }) => {
  console.log("year by year analysis", isExpense);
  /*  const { filter, Years, handleYearSelector, compareToYearSelector, totalBy } =
    useAnalysisConfig(isExpense);

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

    const percent = getPercent(
    totalBy.year[filter.toYear]?.total,
    totalBy.year[filter.byYear]?.total,
  ); 

  return (
    <>
      <div className="flex w-full flex-col gap-5 px-10 pb-30">
        <SectionTitle title="Compare Expenses By Year" isAnalysis />
        <div className="flex flex-row">
          <SelectBar>
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
          </SelectBar>
        </div>
        <div className="flex flex-row gap-5 pb-10">
          <div className="flex flex-1 flex-row">
            <DoubleLineChart
              barInfo={{
                data: chartData,
                lableOne: String(filter.byYear),
                labelTwo: String(filter.toYear),
              }}
              chartInfo={{
                title: `Double Line Graph - `,
                subtext: `${isExpense ? "Expenses" : "Income"} Comparision in Years by Months`,
                footertext: `Showing Total ${isExpense ? "Expenses" : "Income"} in Years`,
              }}
            ></DoubleLineChart>
          </div>
          <div className="flex flex-col justify-center gap-3 py-2">
            <TotalCard
              isExpense
              color="text-year1"
              headText="Expense"
              total={2025}
              footerText={"Your Total Spending in Year"}
              date={2025}
            ></TotalCard>
            <MinMaxStrip isMax />
            <MinMaxStrip isMin />
            <TotalCard
              isExpense
              headText="Expense"
              color="text-year2"
              total={2025}
              footerText={"Your Total Spending in Year"}
              date={2025}
            ></TotalCard>
            <MinMaxStrip isMax />
            <MinMaxStrip isMin />
            <YearCompareCard
              isExpense
              compareIn={filter.byYear}
              compareTo={filter.toYear}
              percent={20}
              date={filter.toYear}
            ></YearCompareCard>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <span className="text-year1 shadow-shadowBlack bg-gradBot text-14 flex h-7 items-center rounded-md px-2 font-medium shadow-md">
              2025
            </span>
            <BudgetStrip amount={20000} color="text-year1" />
            <BudgetMonth isOver />
            <BudgetMonth isUnder />
          </div>
          <div className="flex flex-wrap gap-5 pb-10">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <InfoStrip isExpense key={item} color="bg-year1" amount={-20} />
            ))}
          </div>
          <div className="flex gap-5">
            <span className="text-year2 shadow-shadowBlack bg-gradBot text-14 flex h-7 items-center rounded-md px-2 font-medium shadow-md">
              2025
            </span>
            <BudgetStrip amount={20000} color="text-year2" />
            <BudgetMonth isOver />
            <BudgetMonth isUnder />
          </div>
          <div className="flex flex-wrap gap-5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <InfoStrip isIncome key={item} color="bg-year2" amount={20} />
            ))}
          </div>
        </div>
      </div>
    </>
  ); */
};

export default YearByYearComparision;
