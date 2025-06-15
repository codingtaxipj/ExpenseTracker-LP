import numeral from "numeral";
import React from "react";
import { BsBarChartFill } from "react-icons/bs";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaIndianRupeeSign,
} from "react-icons/fa6";

const YearCompareCard = ({
  compareIn,
  compareTo,

  isExpense,
  percent,
}) => {
  return (
    <>
      <div className="border-greyMedium bg-greyBlack flex w-max flex-col gap-2 rounded-lg p-5">
        <div className="text-14 text-dimText flex w-[16rem] flex-row">
          <div className="flex flex-row items-center gap-2">
            <BsBarChartFill />
            Compare To {compareTo}
          </div>
          <div className="flex flex-1 justify-end">
            {percent.d == 0 && (
              <>
                <span className={`rounded-md bg-green-700 px-2.5 text-white`}>
                  {percent.p}%
                </span>
              </>
            )}
            {percent.d > 0 && (
              <>
                <span
                  className={`flex items-center gap-1 rounded-md px-2.5 text-white ${isExpense ? "bg-red-700" : "bg-green-700"}`}
                >
                  <FaArrowTrendUp />
                  {percent.p}%
                </span>
              </>
            )}
            {percent.d < 0 && (
              <>
                <span
                  className={`flex items-center gap-1 rounded-md px-2.5 text-white ${isExpense ? "bg-green-700" : "bg-red-700"}`}
                >
                  <FaArrowTrendDown />
                  {percent.p}%
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center gap-1 text-[32px] font-bold">
          <FaIndianRupeeSign />
          {numeral(percent.d).format("0,00")}
        </div>
        <div className="text-14 text-dimText flex w-[14rem] flex-row pt-2">
          You Have {isExpense ? "Spent" : "Earned"} {percent.d > 0 && "More"}
          {percent.d < 0 && "Less"} In {compareIn}
        </div>
      </div>
    </>
  );
};

export default YearCompareCard;
