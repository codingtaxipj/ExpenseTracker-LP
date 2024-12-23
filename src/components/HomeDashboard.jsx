import dots from "../assets/4dots.svg";
import CircleIcon from "./CircleIcon";
import { PiDotOutlineFill, PiTagSimpleFill } from "react-icons/pi";
import dummyData from "../assets/lib/demoData.json";
import { FaIndianRupeeSign } from "react-icons/fa6";

const DummyEntries = JSON.parse(JSON.stringify(dummyData));

const HomeDashboard = () => {
  return (
    <>
      <div className="flex h-full flex-row">
        <div className="bg-white w-[70%] rounded-[20px] px-[4rem] py-[2.5rem]">
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
                    <span className="rounded-full bg-travel p-[3px]"></span>
                    {data.subCategory}
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
        </div>
        <div className="h-full w-[30%] rounded-r-[20px] bg-[#f3f4f6]">
          <div className="flex h-full flex-col justify-center gap-10 px-14">
            <div>
              <h6 className="inline-flex items-center gap-2 font-pop-sb text-[16px] text-black">
                <PiTagSimpleFill className="text-pupl" />
                How much you spent ?
              </h6>

              {[1, 2, 3, 4, 5].map((data) => (
                <div key={data}>
                  <div className="flex grow flex-row gap-2 pb-1 pt-4 font-pop-m text-[14px]">
                    <p className="w-full">Utlities & Bills</p>
                    <p className="flex items-center text-right font-pop-sb ">
                      <FaIndianRupeeSign /> <span>20</span>
                    </p>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#d1d5db]">
                    <div className="h-full w-[45%] rounded-full bg-pupl"></div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h6 className="font-pop-sb inline-flex items-center gap-2 text-[16px] text-black">
              < PiTagSimpleFill className="text-pupl" /> How much you earned ?
              </h6>

              {[1, 2, 3, 4, 5].map((data) => (
                <div key={data}>
                  <div className="flex grow flex-row gap-2 pb-1 pt-4 font-pop-m text-[14px]">
                    <p className="w-full">Utlities & Bills</p>
                    <p className="flex items-center text-right font-pop-sb">
                      <FaIndianRupeeSign /> <span>20</span>
                    </p>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#d1d5db]">
                    <div className="h-full w-[45%] rounded-full bg-pupl"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="inline-flex gap-5 justify-center" >
              <button className="bg-pupl text-[white] px-4 py-1 rounded-full" > Add Expence </button>
              <button className="bg-pupl text-[white] px-4 py-1 rounded-full" > Add Income </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
