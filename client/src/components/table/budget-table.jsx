import { TD, TH } from "../TableSection";
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
import { getDate, getMonthName } from "@/utilities/calander-utility";

const BudgetTable = ({ list }) => {
  //Pagination
  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPageItems = list.slice(start, end);
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
  const emptyRows = ITEMS_PER_PAGE - currentPageItems.length;
  return (
    <>
      <div className="w-full cursor-default overflow-hidden rounded-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gradBot">
              <TH className="px-5">Budget</TH>
              <TH className="pr-5">Active From</TH>
              <TH className="pr-5">Created On</TH>
            </tr>
          </thead>
          <tbody className="border-0">
            {list.map((item) => (
              <tr className="bg-darkBlack" key={item.month}>
                <TD className="px-5">
                  <Flexrow className="items-center !gap-1">
                    <Icons.rupee />
                    {amountInteger(item.budget)}
                    <span>/-</span>
                  </Flexrow>
                </TD>
                <TD className="pr-5">
                  <Flexrow className="items-center !gap-1.5">
                    <span>{getMonthName(item.month, "MMMM")}</span>
                  </Flexrow>
                </TD>
                <TD className="pr-5">
                  <Flexrow className="text-12 items-center !gap-1.5">
                    <Icons.dayCal />
                    <span>{getDate(item.createdAt)}</span>
                  </Flexrow>
                </TD>
              </tr>
            ))}
            {Array.from({ length: emptyRows }).map((_, idx) => (
              <tr
                key={`empty-${idx}`}
                className="hover:bg-grey-hover border-b-grey-hover h-15"
              ></tr>
            ))}
          </tbody>
        </table>
      </div>
      {list.length > ITEMS_PER_PAGE && (
        <Pagination className="py-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={
                  page === 1
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            <PaginationItem className="px-2 text-sm">
              Page {page} of {totalPages}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={
                  page === totalPages
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default BudgetTable;
