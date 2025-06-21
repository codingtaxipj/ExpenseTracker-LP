import React from "react";
import { FaArrowDownWideShort, FaArrowUpWideShort } from "react-icons/fa6";
import { Icons } from "../icons";
import { amountFloat } from "../utilityFilter";

const MinMaxStrip = ({ isMax, isMin, amount = 0, date = "Jun/25" }) => {
  return (
    <>
      <div className="text-14 from-gradBot to-gradTop shadow-shadowBlack border-br1 flex h-7 flex-row items-center justify-center gap-1 rounded-md border bg-gradient-to-t px-4 py-2 font-medium shadow">
        {isMax && (
          <span className="text-rr flex items-center gap-1">
            <FaArrowUpWideShort />
            MAX
          </span>
        )}

        {isMin && (
          <span className="text-gg flex items-center gap-1">
            <FaArrowDownWideShort />
            MIN
          </span>
        )}

        <span className="bg-91 mx-2 h-full w-[0.5px]"></span>
        <h4>{date}</h4>
        <span className="bg-91 mx-2 h-full w-[0.5px]"></span>
        <span className="text-[12px]">
          <Icons.rupee />
        </span>
        <h4>{amountFloat(amount)}</h4>
      </div>
    </>
  );
};

export default MinMaxStrip;
