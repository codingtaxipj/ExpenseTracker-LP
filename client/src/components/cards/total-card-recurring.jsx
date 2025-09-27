import React from "react";

import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import { amountFloat } from "../utilityFilter";
import TotalCard from "./TotalCard";
import { cardBg } from "@/global/style";
import { cn } from "@/lib/utils";
import Flexcol from "../section/flexcol";

const TotalCardRecurring = ({ isMonth, total }) => {
  //NOTE - TOTAL CONFIG

  const HeadText = isMonth ? "Monthly Total" : "Yearly Total";
  const color = "text-exp-t";
  const FooterText = isMonth
    ? `Recurring Expesne Every Month`
    : `Recurring Expesne Every Year`;

  return (
    <>
      <Flexcol className={cn("text-14px gap-2 p-5", cardBg)}>
        <Flexrow className="text-14px w-[18rem] font-medium">
          <Flexrow className="items-center gap-2">
            <Icons.upbar className={color} />
            {"Recurring Total"}
          </Flexrow>
          <Flexrow className="items-center justify-end gap-2">
            <Icons.yearCal className={`${color} l mr-1.5`} />
            {isMonth ? "Monthly" : "Yearly"}
          </Flexrow>
        </Flexrow>
        <div className="text-32px flex flex-row items-center gap-0.5 font-bold">
          <Icons.rupee />
          {amountFloat(total)}
        </div>
        <div className="text-14px text-ddd flex w-[14rem] flex-row items-center gap-1 pt-2 pb-2.5">
          {FooterText}
        </div>
      </Flexcol>
    </>
  );
};

export default TotalCardRecurring;
