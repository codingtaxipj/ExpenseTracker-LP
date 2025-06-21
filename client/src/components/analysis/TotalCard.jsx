import React from "react";
import { Icons } from "../icons";
import { amountFloat } from "../utilityFilter";

const TotalCard = ({ date, total, footerText, headText, color }) => {
  return (
    <>
      <div className="from-gradBot to-gradTop shadow-shadowBlack border-br1 flex w-max flex-col gap-2 rounded-lg border bg-gradient-to-t p-5 shadow-md">
        <div className="text-14 flex w-[16rem] flex-row">
          <div className="flex flex-row items-center gap-2">
            <Icons.upbar className={color} />
            {headText}
          </div>
          <div className="flex flex-1 items-center justify-end font-medium">
            <Icons.yearCal className={`${color} l mr-1.5`} />
            {date}
          </div>
        </div>
        <div className="text-32 flex flex-row items-center gap-0.5 font-bold">
          <Icons.rupee />
          {amountFloat(total)}
        </div>
        <div className="text-14 text-ddd flex w-[14rem] flex-row items-center gap-1 pt-2 pb-2.5">
          {footerText}
        </div>
      </div>
    </>
  );
};

export default TotalCard;
