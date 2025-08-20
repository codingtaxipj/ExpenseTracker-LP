import React, { useState } from "react";
import Flexcol from "./flexcol";
import Flexrow from "./flexrow";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import SelectBar from "../selectFilter/SelectBar";
import HorizontalDivider from "../strips/horizontal-divider";
import { Icons } from "../icons";
import useTotalConfig from "@/hooks/useTotalConfig";
import { CurrentYear } from "@/utilities/calander-utility";
import { amountFloat } from "../utilityFilter";
import Boxcard from "./boxcard";
import { GraphTitleSquare } from "../analysis/Single-Year-Graph";
import FlexrowStrip from "../strips/flexrow-strip";
import { cn } from "@/lib/utils";

const MaxCategorySection = ({ isExpense }) => {
  //NOTE - year state
  const [year, setYear] = useState(CurrentYear());
  //NOTE - sets the year to get the months data
  const handleYearSelector = (year) => {
    setYear(Number(year));
  };

  const {
    TotalByPrime_EXP,

    getPrimeListOfYear,
    TotalBySub_EXP,
    TotalBySub_INC,
    getSubListOfYear,
    sortByMax,
    YearsList,
  } = useTotalConfig();

  const prime = TotalByPrime_EXP;

  const sub = isExpense ? TotalBySub_EXP : TotalBySub_INC;

  const primeYear = getPrimeListOfYear(prime, year);
  const primeMax = sortByMax(primeYear);
  const subYear = getSubListOfYear(sub, year);
  const subMax = sortByMax(subYear);

  const txtColor = isExpense ? "text-exp" : "text-inc";

  return (
    <>
      <Flexcol>
        <Flexrow>
          <SelectBar>
            <SelectCard isExpense={isExpense} title={"Select Year"}>
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
          {isExpense && (
            <>
              <Flexrow className="items-center gap-2 pb-2 font-medium">
                <span className="text-16px">
                  <Icons.checkCircle className={cn(txtColor)} />
                </span>
                <span className="pr-2">
                  Top 5 Maximun Prime Category - {year}{" "}
                </span>
              </Flexrow>

              {primeMax.map((sc, idx) => (
                <>
                  <FlexrowStrip
                    key={idx}
                    className="text-14px items-center gap-2"
                  >
                    <span className="text-14px">
                      <Icons.checkCircle className={cn(txtColor)} />
                    </span>
                    <span>{sc.name}</span>
                    <HorizontalDivider className="mx-0.25 bg-white" />
                    <Flexrow className={"w-max items-center gap-0.75"}>
                      <span className="text-12px">
                        <Icons.rupee />
                      </span>
                      <span className={cn(txtColor)}>
                        {amountFloat(sc.total)}
                      </span>
                    </Flexrow>
                  </FlexrowStrip>
                </>
              ))}
            </>
          )}

          <Flexrow className="items-center gap-2 pt-5 pb-2 font-medium">
            <span className="text-16px">
              <Icons.checkCircle className={cn(txtColor)} />
            </span>
            <span className="pr-2">Top 5 Maximun Sub Category - {year} </span>
          </Flexrow>

          {subMax.map((sc, idx) => (
            <>
              <FlexrowStrip key={idx} className="text-14px items-center gap-2">
                <span className="text-14px">
                  <Icons.checkCircle className={cn(txtColor)} />
                </span>
                <span>{sc.subName}</span>
                <HorizontalDivider className="mx-0.25 bg-white" />
                <Flexrow className={"w-max items-center gap-0.75"}>
                  <span className="text-12px">
                    <Icons.rupee />
                  </span>
                  <span className={cn(txtColor)}>{amountFloat(sc.total)}</span>
                </Flexrow>
              </FlexrowStrip>
            </>
          ))}

          <Flexrow className={"!text-14px text-91 items-center gap-2 pt-8"}>
            <Icons.textline /> Showing Top 5 Maximum{" "}
            {isExpense ? "Expense" : "Income"} Categories in Year
          </Flexrow>
        </Boxcard>
      </Flexcol>
    </>
  );
};

export default MaxCategorySection;
