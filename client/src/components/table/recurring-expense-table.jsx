import moment from "moment";
import { useState } from "react";

//Shacdn-UI

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getPrimeColor } from "@/global/categories";

import TooltipStrip from "../strips/tooltip-strip";
import Flexrow from "../section/flexrow";
import IconCircle from "../IconCircle";
import Flexcol from "../section/flexcol";
import { amountFloat } from "../utilityFilter";
import { Icons } from "../icons";
import ExpButton from "../buttons/expButton";
import TD from "./TD";

const RecurringExpenseTable = ({ entries }) => {
  //Pagination
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPageItems = entries.slice(start, end);
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);
  //const emptyRows = ITEMS_PER_PAGE - currentPageItems.length;

  return (
    <>
      <div className="border-grey-hover w-full cursor-default overflow-hidden rounded-md">
        <table className="w-full">
          <tbody className="border-0">
            {currentPageItems.map((data) => (
              <TooltipStrip
                key={data._id}
                content={
                  data.isNote ? data.isNote : "No Transaction Note Given"
                }
              >
                <tr>
                  <TD className="border-b-0 px-0">
                    <Flexrow className="bg-gradBot rounded-lg px-5 py-2.5">
                      <Flexrow className="w-max items-center">
                        <IconCircle
                          className={"!text-24px rounded-lg"}
                          bgColor={data.primeCategory}
                          setIcon={data.subCategory}
                        />
                      </Flexrow>
                      <Flexcol className="gap-0.5">
                        <div className="text-22px font-medium">
                          {data.subCategory}
                        </div>
                        <Flexrow className="!text-91 text-12px w-max gap-3">
                          <Flexrow className={"w-max items-center gap-1"}>
                            <span
                              className="size-3 rounded-xs"
                              style={{
                                backgroundColor: getPrimeColor(
                                  data.primeCategory,
                                ),
                              }}
                            ></span>
                            {data.primeCategory}
                          </Flexrow>
                          <Flexrow className={"w-max items-center gap-1"}>
                            <Icons.repeat />
                            <span>Bill Cycle </span>
                            <span>
                              {data.isRepeatBy == 1 && "Monthly"}
                              {data.isRepeatBy == 2 && "Yearly"}
                            </span>
                          </Flexrow>
                          <Flexrow className={"w-max items-center gap-1"}>
                            <Icons.checkCircle />
                            <span> On {moment(data.onDate).format("Do")}</span>
                          </Flexrow>
                          <Flexrow className={"w-max items-center gap-1"}>
                            <Icons.dayCal />
                            <span>
                              Created {""}
                              {moment(data.onDate).format("MMM, YYYY")}
                            </span>
                          </Flexrow>
                        </Flexrow>
                      </Flexcol>
                      <Flexrow className="text-28px w-max items-center gap-1 pl-2 font-bold">
                        <Icons.rupee className="text-18px" />{" "}
                        <span>{amountFloat(data.ofAmount)}</span>
                      </Flexrow>
                      <Flexrow className="w-max items-center gap-2 pl-2">
                        <TooltipStrip content="Edit Record">
                          <ExpButton
                            btnfor="trip"
                            className="!text-18px !p-2"
                            label={<Icons.pencil />}
                          />
                        </TooltipStrip>
                        <TooltipStrip content="View Record">
                          <ExpButton
                            btnfor="trip"
                            className="!text-18px !p-2"
                            label={<Icons.view />}
                          />
                        </TooltipStrip>
                        <TooltipStrip content="Delete Record">
                          <ExpButton
                            btnfor="trip"
                            className="!text-18px !p-2"
                            label={<Icons.del />}
                          />
                        </TooltipStrip>
                      </Flexrow>
                    </Flexrow>
                  </TD>
                </tr>
              </TooltipStrip>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination className="mt-4">
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
    </>
  );
};

export default RecurringExpenseTable;
