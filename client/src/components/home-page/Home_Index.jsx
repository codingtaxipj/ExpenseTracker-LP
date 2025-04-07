import { FaIndianRupeeSign } from "react-icons/fa6";
import TypewriterAni from "../TypewriterAni";
import { PiDotOutlineFill } from "react-icons/pi";
import CircleIcon from "../CircleIcon";
import dots from "../../assets/4dots.svg";
import dummyData from "../../assets/lib/demoData.json";
import { useMemo } from "react";

const Home_Index = () => {
  const DummyEntries = useMemo(() => JSON.parse(JSON.stringify(dummyData)), []);
  return (
    <>
      <div className="w-[70%] rounded-[20px] bg-white px-[4rem] py-[2.5rem] overflow-y-scroll ">
        <div className="flex pb-5">
          <img className="size-[2rem]" src={dots} alt="dot-icon" />
          <h4 className="font-pop-b pl-2 text-[24px] text-black">Dashboard</h4>
        </div>
        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4">
          <h4 className="font-pop-b text-[24px] text-[black]">Graph</h4>
        </div>
        <div className="flex gap-5 pb-2">
          <div className="mb-3 flex w-max flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
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
          <div className="mb-3 flex w-max flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
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
          <div className="mb-3 flex w-max flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
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

          <div className="mb-3 flex w-max flex-col gap-1 rounded-[12px] border-[0.5px] border-[#dcdcdc] bg-[#f3f3f3] px-6 py-4">
            <div>
              <p className="font-pop-m pb-2 text-[14px]">Trip Expense</p>
            </div>

            <button className="bg-travel rounded-md px-4 py-1 text-[white]">
              Add Now
            </button>
          </div>
        </div>

        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4">
          <h4 className="font-pop-b text-[24px] text-[black]">Today</h4>
        </div>
        {DummyEntries.map((data) => (
          <div
            key={data.id}
            className="mb-3 flex flex-row items-center gap-5 rounded-[12px] border-[0.5px] border-[#fff] bg-white px-2 py-3 hover:border-[.5px] hover:border-[#f2f2f2] hover:bg-[#f6f6f6] hover:shadow-md"
          >
            <div>
              <CircleIcon
                iconName={data.subCategory}
                iconColor={data.primeCategory}
              />
            </div>
            <div className="grow">
              <div className="flex items-center gap-4 pb-1">
                <p className="font-pop-sb pr-2 text-[20px]">
                  {data.subCategory}
                </p>
                <p className="font-pop-m flex items-center gap-2 text-[14px]">
                  <span className="bg-travel rounded-full p-[3px]"></span>
                  {data.primeCategory}
                </p>
                {data.userGivenCategory && (
                  <p className="font-pop-m flex items-center gap-2 text-[14px]">
                    <span className="bg-food rounded-full p-[3px]"></span>
                    {data.userGivenCategory}
                  </p>
                )}
              </div>
              <div className="font-pop-r flex items-center gap-2 text-[14px] text-[#919191]">
                <span>{data.entryTime}</span>
                <span>
                  <PiDotOutlineFill />
                </span>
                <span>{data.entryTitle}</span>
              </div>
            </div>
            <div className="font-pop-sb flex flex-row items-center pr-2 text-[20px] text-[black]">
              <span>
                <FaIndianRupeeSign />
              </span>
              <span>{data.entryAmount}</span>
            </div>
          </div>
        ))}

        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4">
          <h4 className="font-pop-b text-[24px] text-[black]">Analysis</h4>
        </div>
        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7]  pb-4">
          <h4 className="font-pop-b text-[24px] text-[black]">Trip Expenses</h4>
        </div>

        <div className="mt-10 flex justify-center">
          <TypewriterAni />
        </div>
      </div>
    </>
  );
};

export default Home_Index;
