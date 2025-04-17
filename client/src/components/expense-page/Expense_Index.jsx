import { useState, useEffect } from "react";
import axios from "axios";

import { FaIndianRupeeSign } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";

import IconsUsed from "../IconsUsed";
import moment from "moment";

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
import { IoMdEye } from "react-icons/io";

const ExpenseIndex = () => {
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  //Pagination
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPageItems = entries.slice(start, end);
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);
  const emptyRows = ITEMS_PER_PAGE - currentPageItems.length;

  useEffect(() => {
    // Fetch data on component mount
    axios
      .get("http://127.0.0.1:8080/expense/get-expesne-data") // Replace with your API URL
      .then((response) => {
        setEntries(response.data); // Set fetched data to state
        setLoading(false); // Turn off loading
      })
      .catch((err) => {
        setError(err.message); // Handle error
        setLoading(false); // Turn off loading
      });
  }, []);

  return (
    <>
      <div className="w-[70%] overflow-y-auto rounded-[20px] bg-white p-10">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {entries.length === 0 && !error && !loading && <p>Database is Empty</p>}
        {entries.length > 0 && (
          <>
            <div className="flex gap-5 pb-2">
              <div className="mb-3 flex w-1/2 flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
                <div>
                  <p className="font-pop-m flex items-center gap-2 text-[14px]">
                    <span className="bg-travel rounded-full p-[3px]"></span>
                    Last Year Spend
                  </p>
                </div>
                <div className="font-pop-b flex items-center text-[28px] text-[black]">
                  <span>
                    <FaIndianRupeeSign />
                  </span>
                  <span>2000</span>
                </div>
              </div>
              <div className="mb-3 flex w-1/2 flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
                <div>
                  <p className="font-pop-m flex items-center gap-2 text-[14px]">
                    <span className="bg-travel rounded-full p-[3px]"></span>
                    Last Month Spend
                  </p>
                </div>
                <div className="font-pop-b flex items-center text-[28px] text-[black]">
                  <span>
                    <FaIndianRupeeSign />
                  </span>
                  <span>2000</span>
                </div>
              </div>
              <div className="mb-3 flex w-1/2 flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
                <div>
                  <p className="font-pop-m flex items-center gap-2 text-[14px]">
                    <span className="bg-travel rounded-full p-[3px]"></span>
                    Last Week Spend
                  </p>
                </div>
                <div className="font-pop-b flex items-center text-[28px] text-[black]">
                  <span>
                    <FaIndianRupeeSign />
                  </span>
                  <span>2000</span>
                </div>
              </div>
              <div className="mb-3 flex w-1/2 flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
                <div>
                  <p className="font-pop-m pb-2 text-[14px]">Trip Expense</p>
                </div>

                <button className="bg-travel rounded-md px-4 py-1 text-[white]">
                  Add Now
                </button>
              </div>
            </div>
            <div className="pb-4">
              <h4 className="text-md font-medium text-[black]">
                Expense Entries
              </h4>
            </div>
            <div className="cursor-default rounded-md border">
              <Table>
                <TableHeader className="bg-accent">
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>For</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPageItems.map((data) => (
                    <>
                      <TableRow className="h-14">
                        <TableCell className="w-0">
                          <div className="bg-food flex w-fit items-center justify-center rounded-full p-2 text-[20px] text-white">
                            <IconsUsed icon={data.subCategory} />
                          </div>
                        </TableCell>
                        <TableCell className="w-0 pr-5">
                          {" "}
                          {data.subCategory}
                        </TableCell>
                        <TableCell className="w-0 pr-5">
                          {" "}
                          {data.primeCategory}
                        </TableCell>
                        <TableCell className="w-0 pr-5">
                          {moment(data.entryDate).format("DD/MM/yyy")}
                        </TableCell>
                        <TableCell>{data.title}</TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center justify-end">
                            <span>
                              <FaIndianRupeeSign />
                            </span>
                            {data.amount}
                          </div>
                        </TableCell>
                        <TableCell className="w-0 px-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#ebebeb]">
                              <BsThreeDotsVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                            <DropdownMenuItem>
                                <button className="flex w-full items-center">
                                  <span className="flex-grow text-left">
                                    view
                                  </span>
                                  <span>
                                    <IoMdEye className="size-5" />
                                  </span>
                                </button>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <button className="flex w-full items-center">
                                  <span className="flex-grow text-left">
                                    edit
                                  </span>
                                  <span>
                                    <RiPencilFill className="size-5" />
                                  </span>
                                </button>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <button className="flex w-full items-center">
                                  <span className="flex-grow text-left">
                                    delete
                                  </span>
                                  <span>
                                    <MdDeleteForever className="size-5" />
                                  </span>
                                </button>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {/* Empty rows to maintain height */}
                      {Array.from({ length: emptyRows }).map((_, idx) => (
                        <TableRow
                          key={`empty-${idx}`}
                          className="h-14"
                        ></TableRow>
                      ))}
                    </>
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
        )}
      </div>
    </>
  );
};

export default ExpenseIndex;
