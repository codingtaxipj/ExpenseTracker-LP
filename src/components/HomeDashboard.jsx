import dots from "../assets/4dots.svg";
import CircleIcon from "./CircleIcon";
import { PiDotOutlineFill } from "react-icons/pi";
import dummyData from "../assets/lib/demoData.json";
import { FaIndianRupeeSign } from "react-icons/fa6";

const DummyEntries = JSON.parse(JSON.stringify(dummyData));
console.log("gg is" + dummyData[4].userGivenCategory);

const HomeDashboard = () => {
  return (
    <>
      <div className="flex flex-row gap-2">
        <div className="w-[70%] px-[4rem] py-[2.5rem]">
          <div className="flex flex-row items-center justify-start pb-2">
            <img className="size-[2rem]" src={dots} alt="dot-icon" />
            <h4 className="pl-2 font-pop-b text-[24px] text-black">
              Dashboard
            </h4>
          </div>

          <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4 pt-10">
            <h4 className="font-pop-b text-[24px] text-[black]">Today</h4>
          </div>
          {DummyEntries.map((data) => (
            <div
              key={data.id}
              className="bg-white mb-2 flex flex-row items-center gap-5 rounded-[12px] px-2 py-2"
            >
              <div>
                <CircleIcon iconName={data.subCategory} />
              </div>
              <div className="grow">
                <div className="flex items-center gap-4 pb-1">
                  <p className="pr-2 font-pop-sb text-[20px]">
                    {data.primeCategory}
                  </p>
                  <p className="flex items-center gap-2 font-pop-m text-[14px]">
                    {" "}
                    <span className="rounded-full bg-travel p-[3px]"></span>{" "}
                    {data.subCategory}
                  </p>
                  {data.userGivenCategory && (
                    <p className="flex items-center gap-2 font-pop-m text-[14px]">
                      {" "}
                      <span className="rounded-full bg-food p-[3px]"></span>
                      {data.userGivenCategory}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 font-pop-r text-[14px] text-[#919191]">
                  {" "}
                  <span>{data.entryTime}</span>{" "}
                  <span>
                    {" "}
                    <PiDotOutlineFill />{" "}
                  </span>{" "}
                  <span>{data.entryTitle}</span>{" "}
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

          <div className="m-2 mb-5 flex flex-row items-center gap-2 px-[.75rem] py-[1rem]"></div>
        </div>
        <div className="w-[30%] grow rounded-r-md bg-[#cfcfcf]">side bar</div>
      </div>
    </>
  );
};

export default HomeDashboard;
