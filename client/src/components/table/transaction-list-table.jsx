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

import IconCircle from "@/components/IconCircle";

import Flexrow from "@/components/section/flexrow";
import { Icons } from "@/components/icons";
import TooltipStrip from "@/components/strips/tooltip-strip";

import Flexcol from "@/components/section/flexcol";
import { amountFloat } from "@/components/utilityFilter";
import { getPrimeColor } from "@/global/categories";
import TD from "./TD";
import EButton from "@/components/buttons/eButton";
import { cn } from "@/lib/utils";

const TransactionListTable = ({ isExpesne, entries }) => {
  //Pagination
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPageItems = entries.slice(start, end);
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);
  //const emptyRows = ITEMS_PER_PAGE - currentPageItems.length;

  const bgColor = isExpesne ? "bg-exp" : "bg-inc";

  return (
    <>
      <div className="border-grey-hover w-full cursor-default overflow-hidden rounded-md">
        <table className="w-full">
          {/*  <thead>
            <tr className="bg-gradBot">
              <TH className="w-0"></TH>
              <TH className="">Category</TH>
              <TH className="w-50">From</TH>
              <TH className="w-fit">Date</TH>

              <TH className="w-fit"></TH>
              <TH className="w-fit !text-right">Amount</TH>
              <TH className="w-fit"></TH>
            </tr>
          </thead> */}

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
                    <Flexrow className="from-gradBot to-gradTop shadow-shadowBlack border-br1 rounded-lg border bg-gradient-to-t px-5 py-2.5">
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
                            <Icons.dayCal />
                            {moment(data.onDate).format("Do MMM, yyyy")}
                          </Flexrow>
                        </Flexrow>
                      </Flexcol>
                      <Flexrow className="text-28px w-max items-center gap-1 pl-2 font-bold">
                        <Icons.rupee className="text-18px" />
                        <span>{amountFloat(data.ofAmount)}</span>
                      </Flexrow>
                      <Flexrow className="w-max items-center gap-2 pl-2">
                        <TooltipStrip content="Edit Record">
                          <EButton
                            isIcon
                            editIcon
                            className={cn("!text-18px", bgColor)}
                          />
                        </TooltipStrip>
                        <TooltipStrip content="View Record">
                          <EButton
                            isIcon
                            viewIcon
                            className={cn("!text-18px", bgColor)}
                          />
                        </TooltipStrip>
                        <TooltipStrip content="Delete Record">
                          <EButton
                            isIcon
                            deleteIcon
                            className={cn("!text-18px", bgColor)}
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
                  ? "bg-br2 pointer-events-none cursor-not-allowed opacity-50"
                  : `cursor-pointer ${bgColor}`
              }
            >
              <Icons.pageBack />
            </PaginationPrevious>
          </PaginationItem>

          <PaginationItem className="px-5 text-sm">
            Page {page} of {totalPages}
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className={
                page === totalPages
                  ? "bg-br2 pointer-events-none cursor-not-allowed opacity-50"
                  : `cursor-pointer ${bgColor}`
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

export default TransactionListTable;

/** 
 * ? OLD CODE FOR TABLE
 * 
 * <tr className="hover:bg-gradBot">
                  <TD className="px-2.5">
                    <IconCircle
                      bgColor={data.primeCategory}
                      setIcon={data.subCategory}
                    />
                  </TD>
                  <TD className="font-medium">{data.subCategory}</TD>
                  <TD>
                    <button className="text-12px text-dim border-br2 rounded-sm border px-2 py-1.25 leading-none">
                      {data.primeCategory}
                    </button>
                  </TD>
                  <TD>
                    <Flexrow className="text-12px text-dim items-center !gap-1.5">
                      <Icons.dayCal />
                      <span>{moment(data.onDate).format("DD/MM/yyyy")}</span>
                    </Flexrow>
                  </TD>

                  <TD className="text-center">
                    <TooltipStrip content="Trip Expense">
                      <ExpButton
                        btnfor="trip"
                        className="!p-1.5"
                        label={<Icons.trip />}
                      />
                    </TooltipStrip>
                  </TD>
                  <TD>
                    <Flexrow className="items-center justify-end !gap-1.5 font-medium">
                      <Icons.rupee /> <span>{data.ofAmount}</span>
                    </Flexrow>
                  </TD>
                  <TD>
                    <Flexrow className="justify-center !gap-2">
                      <TooltipStrip content="Edit Record">
                        <ExpButton
                          btnfor="trip"
                          className="!p-1.5"
                          label={<Icons.pencil />}
                        />
                      </TooltipStrip>
                      <TooltipStrip content="View Record">
                        <ExpButton
                          btnfor="trip"
                          className="!p-1.5"
                          label={<Icons.view />}
                        />
                      </TooltipStrip>
                      <TooltipStrip content="Delete Record">
                        <ExpButton
                          btnfor="trip"
                          className="!p-1.5"
                          label={<Icons.del />}
                        />
                      </TooltipStrip>
                    </Flexrow>
                  </TD>
                </tr>
 */
