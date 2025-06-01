import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import YearByMonthPieChart from "./YearByMonthPieChart";
import { FaIndianRupeeSign } from "react-icons/fa6";
import YearVSYearCompare from "./YearVSYearCompare";
import PrimeCategoryPieChart from "./PrimeCategoryPieChart";
import SubCategoryBarChart from "./SubCategoryBarChart";

const AnalysisByYear = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="bg-darkBlack [&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover w-full overflow-y-auto p-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex flex-row pb-5">
                <div className="bg-grey-hover flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
                  <button className="px-2 text-sm">Analysis Of Year</button>
                  <div>
                    <Select>
                      <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent className="w-40">
                        <SelectItem value="2024">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-1">
                  <YearByMonthPieChart></YearByMonthPieChart>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex">
                    <h2>Year 2025</h2>
                  </div>
                  <div className="flex">
                    <h2>Expense Breakdown by Month</h2>
                  </div>
                  <div className="flex flex-col gap-1">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
                      <div className="flex items-center gap-2">
                        <span className="size-4 rounded-xs bg-amber-300"></span>
                        <h6>Month Title</h6>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex flex-row">
                <div className="bg-grey-hover flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
                  <button className="px-2 text-sm">Compare Year</button>
                  <div>
                    <Select>
                      <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent className="w-40">
                        <SelectItem value="2024">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <button className="px-2 text-sm">By Year</button>
                  <div>
                    <Select>
                      <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent className="w-40">
                        <SelectItem value="2024">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 py-10">
                <div className="flex flex-row items-center gap-2">
                  <span> Expense 2025 </span>
                  <div className="flex items-center">
                    <FaIndianRupeeSign />
                    <span>Amount Here</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  you have spent X% more or less compare to last year
                </div>
              </div>
              <div className="flex flex-row gap-5 pb-5">
                <div className="flex flex-1/4 flex-row">
                  <YearVSYearCompare></YearVSYearCompare>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex">
                    <h2>Expense Comparision Breakdown by Month</h2>
                  </div>
                  <div className="flex">
                    <h2>Compared To Year 2024 you have spend</h2>
                  </div>
                  <div className="flex flex-col gap-1">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
                      <div className="flex items-center gap-2">
                        <span className="size-4 rounded-xs bg-amber-300"></span>
                        <h6 className="flex flex-row gap-2">
                          <span> In May : </span>
                          <div className="flex items-center gap-1">
                            <span>+/-</span>
                            <FaIndianRupeeSign />
                            <span>235</span>
                            <span>more or less</span>
                          </div>
                        </h6>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-5 p-5">
              <div className="flex flex-row pb-5">
                <div className="bg-grey-hover flex w-max flex-row gap-1 rounded-md px-1.5 py-1">
                  <button className="px-2 text-sm">Analysis Of Year</button>
                  <div>
                    <Select>
                      <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent className="w-40">
                        <SelectItem value="2024">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <button className="px-2 text-sm">By Month</button>
                  <div>
                    <Select>
                      <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
                        <SelectValue placeholder="Select Month" />
                      </SelectTrigger>
                      <SelectContent className="w-40">
                        <SelectItem value="jan">January</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-5 pb-5">
                <div className="flex flex-1">
                  <PrimeCategoryPieChart></PrimeCategoryPieChart>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex">
                    <h2>Year 2025</h2>
                  </div>
                  <div className="flex">
                    <h2>Expense Breakdown by Month</h2>
                  </div>
                  <div className="flex flex-col gap-1">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
                      <div className="flex items-center gap-2">
                        <span className="size-4 rounded-xs bg-amber-300"></span>
                        <h6>Month Title</h6>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <SubCategoryBarChart></SubCategoryBarChart>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AnalysisByYear;
