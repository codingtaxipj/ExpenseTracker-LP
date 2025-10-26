import { Icons } from "../icons";
import { amountInteger } from "../utilityFilter";
import Flexrow from "../section/flexrow";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import TH from "./TH";
import TD from "./TD";
import { cardBgv2 } from "@/global/style";
import { cn } from "@/lib/utils";
import { getMonthName } from "@/utilities/calander-utility";
import useBudgetConfig from "@/hooks/useBudgetConfig";

const BudgetTable = () => {
  const { BudgetList } = useBudgetConfig();
  const filteredList = BudgetList.filter((b) => b.amount > 0);
  return (
    <>
      <Flexrow className={cn("overflow-hidden", cardBgv2)}>
        <table className="w-full">
          <thead>
            <tr className="bg-dark-a5 text-slate-a1">
              <TH className="w-0 px-5">c</TH>
              <TH className="pr-5">Budget</TH>
              <TH className="pr-5">Year</TH>
              <TH className="pr-5">Month</TH>
            </tr>
          </thead>
          <tbody className="text-slate-a3 border-0">
            {filteredList.map((item, indx) => (
              <tr className={cn("text-14px")} key={indx}>
                <TD className="w-0 px-5">c</TD>
                <TD className="">
                  <Flexrow className="items-center !gap-1">
                    <Icons.rupee />
                    {amountInteger(item.amount)}
                    <span>/-</span>
                  </Flexrow>
                </TD>
                <TD className="">
                  <span>{item.year}</span>
                </TD>
                <TD className="">
                  <span>{getMonthName(item.month, "MMMM")}</span>
                </TD>
              </tr>
            ))}
          </tbody>
        </table>
      </Flexrow>
    </>
  );
};

export default BudgetTable;
