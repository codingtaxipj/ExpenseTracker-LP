import React from "react";

import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import { amountFloat } from "../utilityFilter";
import TotalCard from "./TotalCard";

const TotalCardRecurring = ({ isMonth, total }) => {
  //NOTE - TOTAL CONFIG

  const HeadText = isMonth ? "Monthly Total" : "Yearly Total";
  const color = "text-exp";
  const FooterText = isMonth
    ? `Recurring Expesne Every Month`
    : `Recurring Expesne Every Year`;

  return (
    <>
      <div className="from-gradBot to-gradTop shadow-shadowBlack border-br1 flex w-max flex-col gap-2 rounded-lg border bg-gradient-to-t p-5 shadow-md">
        <div className="text-14px flex w-[16rem] flex-row">
          <div className="flex flex-row items-center gap-2">
            <Icons.upbar className={color} />
            {"Recurring Total"}
          </div>
          <div className="flex flex-1 items-center justify-end font-medium">
            <Icons.yearCal className={`${color} l mr-1.5`} />
            {isMonth ? "Monthly" : "Yearly"}
          </div>
        </div>
        <div className="text-32px flex flex-row items-center gap-0.5 font-bold">
          <Icons.rupee />
          {amountFloat(total)}
        </div>
        <div className="text-14px text-ddd flex w-[14rem] flex-row items-center gap-1 pt-2 pb-2.5">
          {FooterText}
        </div>
      </div>
    </>
  );
};

export default TotalCardRecurring;
