import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiTagSimpleFill } from "react-icons/pi";
import { navVars } from "../global/global-variables";

const SideBar = ({ sidebar_title, incomingData, totalSum, sidebar_for }) => {
  const spendBar = (inputAmount) => {
    let p = Math.round((inputAmount / totalSum) * 100);
    return {
      width: `${p}%`,
    };
  };

  return (
    <>
      <div className="flex w-[70%] flex-col">
        <h6 className="font-pop-sb inline-flex items-center gap-2 text-[16px] text-black">
          <PiTagSimpleFill
            className={
              sidebar_for === navVars.EXPENSE ? "text-travel" : "text-income"
            }
          />
          {sidebar_title}
        </h6>
        {incomingData.map((data) => (
          <div key={data._id}>
            <div className="font-pop-m flex grow flex-row gap-2 pt-4 pb-1 text-[14px]">
              <p className="w-full">{data.categoryName}</p>
              <p className="font-pop-sb flex items-center text-right">
                <FaIndianRupeeSign /> <span>{data.categoryTotal}</span>
              </p>
            </div>
            <div className="h-1.5 w-[100%] rounded-full bg-[#d1d5db]">
              <div
                style={spendBar(data.categoryTotal)}
                className={
                  sidebar_for === navVars.EXPENSE
                    ? "bg-travel h-full rounded-full"
                    : "bg-income h-full rounded-full"
                }
              ></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SideBar;
