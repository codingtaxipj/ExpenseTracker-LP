import moment from "moment";
import { useState } from "react";

//Shacdn-UI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { FaCalendarDay } from "react-icons/fa";
import { FaFileLines, FaIndianRupeeSign } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import IconCircle from "./IconCircle";
import { IoMdEye } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

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
      <div className="border-grey-hover cursor-default overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-grey-hover bg-grey-hover border-b-grey-hover">
              <TableHead className="p-2.5"></TableHead>
              <TableHead className="text-dim-text p-2.5">Category</TableHead>
              <TableHead className="text-dim-text p-2.5">From</TableHead>
              <TableHead className="text-dim-text p-2.5">Date</TableHead>
              <TableHead className="text-dim-text p-2.5">For</TableHead>
              <TableHead className="text-dim-text p-2.5">Amount</TableHead>
              <TableHead className="p-2.5"> </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border-0">
            {currentPageItems.map((data) => (
              <TableRow
                key={data._id}
                className="hover:bg-grey-hover border-b-grey-hover h-15"
              >
                <TableCell className="w-0 px-2.5">
                  <IconCircle
                    bgColor={data.primeCategory}
                    setIcon={data.subCategory}
                  />
                </TableCell>
                <TableCell className="min-w-36 px-2.5">
                  <div className="text-base font-medium">
                    {data.subCategory}
                  </div>
                </TableCell>
                <TableCell className="min-w-32 px-2.5">
                  <div className="text-dim-text text-xs">
                    <span className="border-grey-border rounded-sm border px-2 py-0.5">
                      {data.primeCategory}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="min-w-32 px-2.5">
                  <div className="text-dim-text flex items-center gap-1 text-xs">
                    <FaCalendarDay />
                    <span>{moment(data.entryDate).format("DD/MM/yyy")}</span>
                  </div>
                </TableCell>
                <TableCell className="w-full px-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <FaFileLines /> <span>{data.title}</span>
                  </div>
                </TableCell>
                <TableCell className="w-0 px-2.5">
                  <div className="flex items-center gap-0.5 text-base font-medium">
                    <FaIndianRupeeSign /> <span>{data.amount}</span>
                  </div>
                </TableCell>
                <TableCell className="w-0 px-2.5">
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
                </TableCell>
              </TableRow>
            ))}
            {/* Empty rows to maintain height */}
            {Array.from({ length: emptyRows }).map((_, idx) => (
              <TableRow
                key={`empty-${idx}`}
                className="hover:bg-grey-hover border-b-grey-hover h-15"
              ></TableRow>
            ))}
          </TableBody>
        </Table>
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

export default TableSection;
