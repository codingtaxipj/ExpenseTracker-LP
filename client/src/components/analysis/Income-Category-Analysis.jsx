import React, { useState } from "react";
import Flexcol from "../section/flexcol";
import { CurrentYear } from "@/utilities/calander-utility";
import Flexrow from "../section/flexrow";
import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import Boxcard from "../section/boxcard";
import { GraphTitleSquare } from "./Single-Year-Graph";
import FlexrowStrip from "../strips/flexrow-strip";
import { Icons } from "../icons";
import useTotalConfig from "@/hooks/useTotalConfig";
import HorizontalDivider from "../strips/horizontal-divider";
import { amountFloat } from "../utilityFilter";

const IncomeCategoryAnalysis = () => {
  //NOTE - year state
  const [year, setYear] = useState(CurrentYear());
  //NOTE - sets the year to get the months data
  const handleYearSelector = (year) => {
    setYear(Number(year));
  };

  const {
    TotalByYear_INC,
    getTotalOfYear,
    TotalBySub_INC,
    getSubListOfYear,
    YearsList,
  } = useTotalConfig();

  const SubOfYear = getSubListOfYear(TotalBySub_INC, year);
  const TotalIncomeYear = getTotalOfYear(TotalByYear_INC, year);

  return (
    <>
      <Flexcol>
        <Flexrow>
          <SelectBar>
            <SelectCard title={"Select Year"}>
              <SelectFilter
                placeholder={"Select Year"}
                onValueChange={handleYearSelector}
                defaultValue={String(CurrentYear())}
                list={YearsList}
              ></SelectFilter>
            </SelectCard>
          </SelectBar>
        </Flexrow>
        <Boxcard className={"h-max flex-row flex-wrap gap-2 p-8"}>
          <Flexrow className="items-center gap-2 font-medium">
            <GraphTitleSquare className={"bg-inc"} />
            <span className="pr-2">Income Category - {year} </span>
            <span className="text-14">
              <Icons.checkCircle className="text-inc" />
            </span>
            <span>Total Income </span>
            <HorizontalDivider className="bg-white" />
            Rs.
            <span className="text-inc">{amountFloat(TotalIncomeYear)}</span>
          </Flexrow>
          <Flexrow className={"!text-14 text-91 items-center gap-2 pb-8"}>
            Expenses in Each Sub Categories of Selected Prime Category
          </Flexrow>
          {SubOfYear.map((sc, idx) => (
            <>
              <FlexrowStrip key={idx} className="text-14 items-center gap-2">
                <span className="text-14">
                  <Icons.checkCircle className={`${"text-inc"}`} />
                </span>
                <span>{sc.subName}</span>
                <HorizontalDivider className="mx-0.25 bg-white" />
                <Flexrow className={"w-max items-center gap-0.75"}>
                  <span className="text-12">
                    <Icons.rupee />
                  </span>
                  <span className="text-inc">{sc.total}</span>
                </Flexrow>
              </FlexrowStrip>
            </>
          ))}
          <Flexrow className={"!text-14 text-91 items-center gap-2 pt-8"}>
            <Icons.textline /> Showing Total Income of Each Category in Year
          </Flexrow>
        </Boxcard>
      </Flexcol>
    </>
  );
};

export default IncomeCategoryAnalysis;
