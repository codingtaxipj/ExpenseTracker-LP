import useTotalConfig from "@/hooks/useTotalConfig";
import Flexcol from "../section/flexcol";
import Flexrow from "../section/flexrow";
import FlexrowStrip from "../strips/flexrow-strip";
import { Card, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { GraphTitleSquare } from "./Single-Year-Graph";
import { CurrentYear } from "@/utilities/calander-utility";
import { useEffect, useState } from "react";
import { getPrimeColor } from "@/global/categories";
import useMinMaxConfig from "@/hooks/useMinMaxConfig";
import { Icons } from "../icons";
import HorizontalDivider from "../strips/horizontal-divider";
import { amountFloat } from "../utilityFilter";
import Boxcard from "../section/boxcard";
import SelectBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";

const spendBar = (input, total, name) => {
  const p = Math.round((input / total) * 100);
  return {
    width: `${p}%`,
    height: ".75rem",
    backgroundColor: getPrimeColor(name),
  };
};

const ExpenseCategoryAnalysis = () => {
  //NOTE - year state
  const [year, setYear] = useState(CurrentYear());
  //NOTE - sets the year to get the months data
  const handleYearSelector = (year) => {
    setYear(Number(year));
    setSelected(0);
  };

  const {
    TotalByPrime_EXP,
    getPrimeListOfYear,
    TotalByYear_EXP,
    getTotalOfYear,
    TotalBySub_EXP,
    getSubListOfYear,
    YearsList,
  } = useTotalConfig();

  const { MMofPrime_EXP, MMgetPrimeofYear } = useMinMaxConfig();
  const mmPrime = MMgetPrimeofYear(MMofPrime_EXP, year);

  const PrimeOfYear = getPrimeListOfYear(TotalByPrime_EXP, year);
  const SubOfYear = getSubListOfYear(TotalBySub_EXP, year);
  const TotalExpenseYear = getTotalOfYear(TotalByYear_EXP, year);

  const [selected, setSelected] = useState(0);
  const [PrimeCat, setPrimeCat] = useState([]);
  const [SubCat, setSubCat] = useState([]);

  useEffect(() => {
    if (PrimeOfYear.length > 0) {
      setPrimeCat(PrimeOfYear[selected]);
      setSubCat(
        SubOfYear.filter((s) => s.primeName === PrimeOfYear[selected]?.name),
      );
    }
  }, [PrimeOfYear, SubOfYear, selected]);

  const handleChange = (index) => {
    if (selected === index) {
      setSelected(null); // uncheck if already selected
    } else {
      setSelected(index);
      const sub = SubOfYear.filter(
        (s) => s.primeName === PrimeOfYear[index].name,
      );
      setSubCat(sub);
      setPrimeCat(PrimeOfYear[index]);
    }
  };

  return (
    <>
      <Flexcol>
        <Flexrow>
          <SelectBar>
            <SelectCard isExpense title={"Select Year"}>
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
          <Boxcard className={"w-full flex-col gap-2"}>
            <Flexrow className="items-center gap-2 font-medium">
              <GraphTitleSquare className={"bg-exp"} />
              <span className="pr-2">Prime Category - {year} </span>
              <span className="text-14px">
                <Icons.checkCircle className="text-exp" />
              </span>
              <span>Total Expense </span>
              <HorizontalDivider className="bg-white" />
              Rs.
              <span className="text-exp">{amountFloat(TotalExpenseYear)}</span>
            </Flexrow>
            <Flexrow className={"gap-2 pb-5"}>
              <span className="!text-14px text-91">
                Bars Showing Expense in a Year by Category
              </span>
            </Flexrow>
            {PrimeOfYear.map((m, idx) => (
              <Flexrow key={idx} className={"items-center py-2"}>
                <Checkbox
                  className={
                    "data-[state=checked]:bg-exp border border-[#505050] hover:cursor-pointer"
                  }
                  onCheckedChange={() => handleChange(idx)}
                  checked={selected === idx}
                ></Checkbox>
                <Flexcol className="gap-1.5">
                  <Flexrow className={"text-14px items-center gap-2"}>
                    <GraphTitleSquare
                      className={"size-3"}
                      style={{ backgroundColor: getPrimeColor(m.name) }}
                    />
                    <span>{m.name}</span>
                    <span className="text-14px pl-2">
                      <Icons.checkCircle
                        style={{ color: getPrimeColor(m.name) }}
                      />
                    </span>

                    <Flexrow className={"w-max items-center gap-0.25"}>
                      {" "}
                      <Icons.rupee className="text-12px pr-1" />{" "}
                      {amountFloat(m.total)}
                    </Flexrow>
                  </Flexrow>
                  <div
                    style={spendBar(m.total, mmPrime.max.total, m.name)}
                    className="rounded-md"
                  ></div>
                </Flexcol>
              </Flexrow>
            ))}
            <Flexrow
              className={
                "!text-14px text-91 items-center justify-center gap-2 pt-5"
              }
            >
              <Icons.textline /> Showing Total Expense of Each Prime Categories
              in Year
            </Flexrow>
          </Boxcard>

          <Boxcard className={"h-max w-100 flex-wrap gap-2 p-8"}>
            <Flexrow className="items-center gap-2 font-medium">
              <GraphTitleSquare className={"bg-exp"} />
              <span className="pr-2">Sub Categories</span>
            </Flexrow>
            <Flexrow
              className={
                "!text-14px text-91 items-center justify-center gap-2 pb-8"
              }
            >
              Expenses in Each Sub Categories of Selected Prime Category
            </Flexrow>
            {SubCat.map((sc, idx) => (
              <>
                <FlexrowStrip
                  key={idx}
                  className="text-14px items-center gap-2"
                >
                  <span className="text-14px">
                    <Icons.checkCircle className={`${"text-exp"}`} />
                  </span>
                  <span>{sc.subName}</span>
                  <HorizontalDivider className="mx-0.25 bg-white" />
                  <Flexrow className={"w-max items-center gap-0.75"}>
                    <span className="text-12px">
                      <Icons.rupee />
                    </span>
                    <span>{sc.total}</span>
                  </Flexrow>
                </FlexrowStrip>
              </>
            ))}
            <Flexrow className={"items-center gap-2 pt-8 font-medium"}>
              <span className="text-14px">
                <Icons.checkCircle className="text-exp" />
              </span>
              <span>Total</span>
              <Flexrow className={"w-max items-center gap-0.75"}>
                <span className="text-12px">
                  <Icons.rupee />
                </span>
                <span>{PrimeCat.total}</span>
              </Flexrow>
            </Flexrow>
            <Flexrow className={"!text-14px text-91 items-center gap-2"}>
              <GraphTitleSquare className={"bg-91 size-3"} />
              <span>In {PrimeCat.name}</span>
            </Flexrow>
          </Boxcard>
        </Flexrow>
      </Flexcol>
    </>
  );
};

export default ExpenseCategoryAnalysis;
