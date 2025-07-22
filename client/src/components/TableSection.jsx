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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//Icons
import { BsThreeDotsVertical } from "react-icons/bs";
import IconCircle from "./IconCircle";
import { IoMdEye } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import Flexrow from "./section/flexrow";
import { Icons } from "./icons";
import ExpButton from "./buttons/expButton";
import TooltipStrip from "./strips/tooltip-strip";

const TableSection = ({ entries }) => {
  //Pagination
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPageItems = entries.slice(start, end);
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);
  const emptyRows = ITEMS_PER_PAGE - currentPageItems.length;

  return (
    <>
      <div className="border-grey-hover w-full cursor-default overflow-hidden rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="bg-gradBot">
              <TH className="w-0"></TH>
              <TH className="w-50">Category</TH>
              <TH className="w-50">From</TH>
              <TH className="w-fit">Date</TH>

              <TH className="w-fit"></TH>
              <TH className="w-fit !text-right">Amount</TH>
              <TH className="w-fit"></TH>
            </tr>
          </thead>

          <tbody className="border-0">
            {currentPageItems.map((data) => (
              <TooltipStrip key={data._id} content={data.isExpenseNote}>
                <tr className="hover:bg-gradBot">
                  <TD>
                    <IconCircle
                      bgColor={data.primeCategory}
                      setIcon={data.subCategory}
                    />
                  </TD>
                  <TD className="font-medium">{data.subCategory}</TD>
                  <TD>
                    <button className="text-12 text-dim border-br2 rounded-sm border px-2 py-1.25 leading-none">
                      {data.primeCategory}
                    </button>
                  </TD>
                  <TD>
                    <Flexrow className="text-12 text-dim items-center !gap-1.5">
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
                      <ExpButton
                        btnfor="trip"
                        className="!p-1.5"
                        label={<Icons.trip />}
                      />
                      <ExpButton
                        btnfor="trip"
                        className="!p-1.5"
                        label={<Icons.trip />}
                      />
                      <ExpButton
                        btnfor="trip"
                        className="!p-1.5"
                        label={<Icons.trip />}
                      />
                    </Flexrow>
                  </TD>
                  {/*  <TD className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-grey-border inline-flex size-8 cursor-pointer items-center justify-center rounded-md">
                      <BsThreeDotsVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <button className="flex w-full items-center">
                          <span className="flex-grow text-left">view</span>
                          <span>
                            <IoMdEye className="size-5" />
                          </span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button className="flex w-full items-center">
                          <span className="flex-grow text-left">edit</span>
                          <span>
                            <RiPencilFill className="size-5" />
                          </span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button className="flex w-full items-center">
                          <span className="flex-grow text-left">delete</span>
                          <span>
                            <MdDeleteForever className="size-5" />
                          </span>
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TD> */}
                </tr>
              </TooltipStrip>
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

export const TH = ({ children, className = "" }) => {
  return (
    <th className={`text-14 px-1.5 py-2.5 text-left font-medium ${className}`}>
      {children}
    </th>
  );
};

export const TD = ({ children, className = "" }) => {
  return (
    <td
      className={`text-14 border-b-br1 h-16 border-b px-1.5 py-2.5 ${className}`}
    >
      {children}
    </td>
  );
};

export default TableSection;
