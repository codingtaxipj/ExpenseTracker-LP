import SingleBarChart from "@/components/charts/SingleBarChart";
import OuterBar from "@/components/selectFilter/OuterBar";
import SelectCard from "@/components/selectFilter/SelectCard";
import SelectFilter from "@/components/selectFilter/SelectFilter";
import SelectMonthAsFilter from "@/components/selectFilter/SelectMonthAsFilter";
import useBarCharConfig from "@/components/useBarCharConfig";
import React from "react";

const BarChartSection = ({ entries, isExpense }) => {
  const {
    Graph,
    filter,
    showGraphBy,
    setShowGraphBy,
    GraphConfig,
    handleShowMonthIn,
    handleSelectYear,
    handleSelectMonth,
  } = useBarCharConfig(entries, isExpense);

  const setSelectDefault = (list, value = false) => {
    if (value === false) {
      return String(list);
    } else {
      return String(list.find((item) => item === value)) || String(list[0]);
    }
  };

  return (
    <>
      <div className="flex flex-row pb-5">
        <OuterBar>
          <SelectCard isExpense={isExpense} title={"Show Chart By "}>
            <button
              onClick={() => {
                setShowGraphBy(Graph.byYear);
              }}
              className={`rounded-sm border-0 px-5 py-1.5 text-xs ${
                showGraphBy === Graph.byYear
                  ? isExpense
                    ? "bg-expense"
                    : "bg-income"
                  : isExpense
                    ? "hover:bg-expense bg-darkBlack"
                    : "hover:bg-income bg-darkBlack"
              }`}
            >
              By Year
            </button>
            <button
              onClick={() => {
                setShowGraphBy(Graph.byMonth.asWeek);
              }}
              className={`rounded-sm border-0 px-5 py-1.5 text-xs ${
                showGraphBy === Graph.byMonth.asWeek ||
                showGraphBy === Graph.byMonth.asDate
                  ? isExpense
                    ? "bg-expense"
                    : "bg-income"
                  : isExpense
                    ? "hover:bg-expense bg-darkBlack"
                    : "hover:bg-income bg-darkBlack"
              }`}
            >
              By Month
            </button>
          </SelectCard>
        </OuterBar>
      </div>
      <div className="flex flex-row pb-5">
        <OuterBar>
          {showGraphBy === Graph.byYear && GraphConfig.years !== 0 && (
            <>
              <SelectCard isExpense={isExpense} title={"Filter By"}>
                <SelectFilter
                  placeholder={"Select year"}
                  list={GraphConfig.years}
                  onValueChange={handleSelectYear}
                  defaultValue={setSelectDefault(
                    GraphConfig.years,
                    filter.byYear,
                  )}
                ></SelectFilter>
              </SelectCard>
            </>
          )}
          {(showGraphBy === Graph.byMonth.asWeek ||
            showGraphBy === Graph.byMonth.asDate) && (
            <>
              <SelectCard isExpense={isExpense} title="Show As">
                <SelectMonthAsFilter
                  placeholder="Select Value"
                  mWeek={Graph.inMonth.asWeek}
                  mdays={Graph.inMonth.asDate}
                  onValueChange={handleShowMonthIn}
                />
              </SelectCard>

              {GraphConfig.months !== 0 && GraphConfig.years !== 0 && (
                <>
                  <SelectCard isExpense={isExpense} title={"Filter By"}>
                    <SelectFilter
                      placeholder={"Select Year"}
                      list={GraphConfig.years}
                      onValueChange={handleSelectYear}
                      defaultValue={setSelectDefault(
                        GraphConfig.years,
                        filter.byYear,
                      )}
                    ></SelectFilter>
                    <SelectFilter
                      placeholder={"Select Month"}
                      list={GraphConfig.months}
                      onValueChange={handleSelectMonth}
                      defaultValue={setSelectDefault(
                        GraphConfig.months,
                        filter.byMonth,
                      )}
                      isMonthSelect={true}
                    ></SelectFilter>
                  </SelectCard>
                </>
              )}
            </>
          )}
        </OuterBar>
      </div>

      <SingleBarChart
        barInfo={{
          data: GraphConfig.graphData,
          label: GraphConfig.barLabel,
          color: GraphConfig.barColor,
        }}
        chartInfo={{
          title: GraphConfig.barLabel,
          subtext: GraphConfig.SubText,
          footertext: GraphConfig.BottomText,
        }}
      ></SingleBarChart>
    </>
  );
};

export default BarChartSection;

/* 





*/
