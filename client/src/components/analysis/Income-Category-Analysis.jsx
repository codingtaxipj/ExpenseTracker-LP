import React, { useState } from "react";
import Flexcol from "../section/flexcol";
import { CurrentYear } from "@/utilities/calander-utility";
import Flexrow from "../section/flexrow";
import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import Boxcard from "../section/boxcard";
import { GraphTitleSquare } from "./linear-graph-data";
import FlexrowStrip from "../strips/flexrow-strip";
import { Icons } from "../icons";
import useTotalConfig from "@/hooks/useTotalConfig";
import HorizontalDivider from "../strips/horizontal-divider";
import { amountFloat } from "../utilityFilter";
import { cardBgv2 } from "@/global/style";
import { cn } from "@/lib/utils";

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
        <Flexcol className={cn("text-slate-a1 gap-2 p-10 px-12", cardBgv2)}>
          <Flexrow className="items-center gap-2 font-medium">
            <GraphTitleSquare className={"bg-inc-a2"} />
            <span className="pr-2">Income Category - {year} </span>
            <span className="text-14px">
              <Icons.checkCircle className="text-inc-a3" />
            </span>
            <span>Total Income </span>
            <HorizontalDivider className="bg-white" />
            Rs.
            <span className="text-inc-a3">{amountFloat(TotalIncomeYear)}</span>
          </Flexrow>
          <Flexrow className={"!text-14px items-center gap-2 pb-8"}>
            Expenses in Each Sub Categories of Selected Prime Category
          </Flexrow>
          <Flexrow className={"flex-wrap gap-2"}>
            {SubOfYear.map((sc, idx) => (
              <>
                <Flexrow
                  key={idx}
                  className={cn(
                    "text-14px !text-slate-a3 border-slate-a7 w-max cursor-pointer items-center gap-2 rounded-sm border px-2.5 py-1 font-medium",
                  )}
                >
                  <span className="text-14px">
                    <Icons.checkCircle className={"text-inc-a2"} />
                  </span>
                  <span>{sc.subName}</span>
                  <HorizontalDivider className="mx-0.25 bg-white" />
                  <Flexrow className={"w-max items-center gap-0.75"}>
                    <span className="text-12px">
                      <Icons.rupee />
                    </span>
                    <span className="text-inc-a3">{sc.total}</span>
                  </Flexrow>
                </Flexrow>
              </>
            ))}
          </Flexrow>
          <Flexrow className={"!text-14px items-center gap-2 pt-8"}>
            <Icons.textline /> Showing Total Income of Each Category in Year
          </Flexrow>
        </Flexcol>
      </Flexcol>
    </>
  );
};

export default IncomeCategoryAnalysis;
