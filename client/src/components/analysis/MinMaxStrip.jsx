import React from "react";
import {
  FaArrowDownWideShort,
  FaArrowUpWideShort,
  FaIndianRupeeSign,
} from "react-icons/fa6";

const MinMaxStrip = ({ isMax, isMin }) => {
  return (
    <>
      <div className="bg-greyMedium text-14 flex h-7 flex-row items-center justify-center gap-1 rounded-md px-4 py-2">
        <span className="mr-1.5">
          {isMax && <FaArrowUpWideShort />}
          {isMin && <FaArrowDownWideShort />}
        </span>
        {isMax && <h4>MAX</h4>}
        {isMin && <h4>MIN</h4>}
        <span className="mx-2 h-full w-[0.5px] bg-white"></span>
        <h4>Month</h4>
        <span className="mx-2 h-full w-[0.5px] bg-white"></span>
        <span className="text-[12px]">
          <FaIndianRupeeSign />
        </span>
        <h4>20000</h4>
      </div>
    </>
  );
};

export default MinMaxStrip;
