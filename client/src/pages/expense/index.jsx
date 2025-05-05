import { useState, useEffect } from "react";

import { FaFileLines, FaIndianRupeeSign } from "react-icons/fa6";
import { BsBarChartFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";

import IconsUsed from "@/components/IconsUsed";
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
import { useSelector } from "react-redux";
import { FaCalendarDay, FaListUl } from "react-icons/fa";

const ExpenseIndex = () => {
  const [entries, setEntries] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state

  //Pagination
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPageItems = entries.slice(start, end);
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);
  const emptyRows = ITEMS_PER_PAGE - currentPageItems.length;

  const data = useSelector((state) => state.configExpense.dataExpense);

  useEffect(() => {
    if (data !== null) {
      setEntries(data);
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <div className="[&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-3/4 overflow-y-auto rounded-md p-10 text-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <div className="flex gap-5">
              <div className="border-grey-border flex w-1/2 flex-col gap-2 rounded-md border p-5">
                <div className="flex items-center gap-2 text-sm">
                  <BsBarChartFill />
                  <span>Last Year Expense</span>
                </div>
                <div className="flex items-center gap-1 text-3xl font-bold">
                  <FaIndianRupeeSign />
                  <span>2000</span>
                </div>
              </div>
              <div className="border-grey-border flex w-1/2 flex-col gap-2 rounded-md border p-5">
                <div className="flex items-center gap-2 text-sm">
                  <BsBarChartFill />
                  <span>Last Month Expense</span>
                </div>
                <div className="flex items-center gap-1 text-3xl font-bold">
                  <FaIndianRupeeSign />
                  <span>2000</span>
                </div>
              </div>
              <div className="border-grey-border flex w-1/2 flex-col gap-2 rounded-md border p-5">
                <div className="flex items-center gap-2 text-sm">
                  <BsBarChartFill />
                  <span>Last Week Expense</span>
                </div>
                <div className="flex items-center gap-1 text-3xl font-bold">
                  <FaIndianRupeeSign />
                  <span>2000</span>
                </div>
              </div>
              <div className="border-grey-border flex w-1/2 flex-col gap-2 rounded-md border p-5">
                <div className="flex items-center gap-2 text-sm">
                  <BsBarChartFill />
                  <span>Trip Expense</span>
                </div>
                <div className="">
                  <button className="bg-travel w-full rounded-sm px-4 py-1 text-sm font-medium">
                    Add Now
                  </button>
                </div>
              </div>
            </div>
            <div className="py-6">
              <div className="flex py-2.75">
                <div className="flex items-center gap-2 pl-0.5 text-base font-medium">
                  <FaListUl />
                  Expense Entries
                </div>
              </div>
              <div className="border-grey-hover cursor-default overflow-hidden rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-grey-hover bg-grey-hover border-b-grey-hover">
                      <TableHead className="p-2.5"></TableHead>
                      <TableHead className="text-dim-text p-2.5">
                        Category
                      </TableHead>
                      <TableHead className="text-dim-text p-2.5">
                        From
                      </TableHead>
                      <TableHead className="text-dim-text p-2.5">
                        Date
                      </TableHead>
                      <TableHead className="text-dim-text p-2.5">For</TableHead>
                      <TableHead className="text-dim-text p-2.5">
                        Amount
                      </TableHead>
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
                          <div className="bg-food flex w-fit items-center justify-center rounded-full p-2 text-[20px] text-white">
                            <IconsUsed icon={data.subCategory} />
                          </div>
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
                            <span>
                              {moment(data.entryDate).format("DD/MM/yyy")}
                            </span>
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
                            <DropdownMenuTrigger className="hover:bg-grey-border flex size-8 cursor-pointer items-center justify-center rounded-sm">
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
                      onClick={() =>
                        setPage((p) => Math.min(p + 1, totalPages))
                      }
                      className={
                        page === totalPages
                          ? "pointer-events-none cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ExpenseIndex;
