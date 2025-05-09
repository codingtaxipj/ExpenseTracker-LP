import { FaIndianRupeeSign } from "react-icons/fa6";
import NavMenu from "../components/Navigation/NavMenu";
import { navVars } from "../global/globalVariables";

const Elements = () => {
  return (
    <>
      <NavMenu activeBtn={navVars.INCOME}>
        <div className="h-full overflow-y-scroll px-[4rem] py-[2.5rem]">
          <div className="flex flex-row items-center justify-start pb-2">
            <h4 className="font-pop-b pl-2 text-[24px] text-black">
              Title Here
            </h4>
          </div>

          <div>
            <div className="flex gap-5">
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
            </div>
          </div>
        </div>
      </NavMenu>
    </>
  );
};

export default Elements;
