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
      <div className="bg-white w-[70%] rounded-[20px] px-[4rem] py-[2.5rem]">
        <div className="flex flex-row items-center justify-start pb-2">
          <img className="size-[2rem]" src={dots} alt="dot-icon" />
          <h4 className="pl-2 font-pop-b text-[24px] text-black">Dashboard</h4>
        </div>

        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4 pt-10">
          <h4 className="font-pop-b text-[24px] text-[black]">Today</h4>
        </div>
        {DummyEntries.map((data) => (
          <div
            key={data.id}
            className="bg-white mb-3 flex flex-row items-center gap-5 rounded-[12px] border-[0.5px] border-[#fff] px-2 py-3 hover:border-[.5px] hover:border-[#f2f2f2] hover:bg-[#f6f6f6] hover:shadow-md"
          >
            <div>
              <CircleIcon
                iconName={data.subCategory}
                iconColor={data.primeCategory}
              />
            </div>
            <div className="grow">
              <div className="flex items-center gap-4 pb-1">
                <p className="pr-2 font-pop-sb text-[20px]">
                  {data.subCategory}
                </p>
                <p className="flex items-center gap-2 font-pop-m text-[14px]">
                  <span className="rounded-full bg-travel p-[3px]"></span>
                  {data.primeCategory}
                </p>
                {data.userGivenCategory && (
                  <p className="flex items-center gap-2 font-pop-m text-[14px]">
                    <span className="rounded-full bg-food p-[3px]"></span>
                    {data.userGivenCategory}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 font-pop-r text-[14px] text-[#919191]">
                <span>{data.entryTime}</span>
                <span>
                  <PiDotOutlineFill />
                </span>
                <span>{data.entryTitle}</span>
              </div>
            </div>
            <div className="flex flex-row items-center pr-2 font-pop-sb text-[20px] text-[black]">
              <span>
                <FaIndianRupeeSign />
              </span>
              <span>{data.entryAmount}</span>
            </div>
          </div>
        ))}

        <div className="mt-10 flex justify-center">
          <TypewriterAni />
        </div>
      </div>
    </>
  );
};

export default Home_Index;
