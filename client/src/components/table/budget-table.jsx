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

const BudgetTable = ({ list }) => {
  //Pagination
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPageItems = list.slice(start, end);
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
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
            {currentPageItems.map((item, indx) => (
              <tr className={cn("text-14px")} key={indx}>
                <TD className="w-0 px-5">c</TD>
                <TD className="">
                  <Flexrow className="items-center !gap-1">
                    <Icons.rupee />
                    {amountInteger(item.budget)}
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

      <Pagination className="py-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={
                page === 1
                  ? "bg-dark-a3 pointer-events-none cursor-not-allowed"
                  : `bg-bud-a3 text-dark-a2 cursor-pointer`
              }
            >
              <Icons.pageBack />
            </PaginationPrevious>
          </PaginationItem>

          <PaginationItem className="px-2 text-sm">
            Page {page} of {totalPages}
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className={
                page === totalPages
                  ? "bg-dark-a3 pointer-events-none cursor-not-allowed"
                  : `bg-bud-a3 text-dark-a2 cursor-pointer`
              }
            >
              <Icons.pageNext />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default BudgetTable;
