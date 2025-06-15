import numeral from "numeral";
import React from "react";
import { BsBarChartFill } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";

const TotalCard = ({ date, total, isExpense, footerText, color }) => {
  return (
    <>
      <div className="border-greyMedium bg-greyBlack flex w-max flex-col gap-2 rounded-lg p-5">
        <div className="text-14 text-dimText flex w-[16rem] flex-row">
          <div className="flex flex-row items-center gap-2">
            <BsBarChartFill />
            Total {isExpense ? "Spending" : "Earning"}
          </div>
          <div className="flex flex-1 justify-end">
            <span
              style={{ backgroundColor: color }}
              className="rounded-sm px-2.5 text-white"
            >
              {date}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1 text-[32px] font-bold">
          <FaIndianRupeeSign />
          {numeral(total).format("0,00")}
        </div>
        <div className="text-14 text-dimText flex w-[14rem] flex-row pt-2">
          {footerText}
        </div>
      </div>
    </>
  );
};

export default TotalCard;
