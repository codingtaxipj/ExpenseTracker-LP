import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiTagSimpleFill } from "react-icons/pi";
import PropTypes from "prop-types";
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
        
        <h6 className="inline-flex items-center gap-2 font-pop-sb text-[16px] text-black">
          <PiTagSimpleFill
            className={
              sidebar_for === navVars.EXPENSE ? "text-travel" : "text-income"
            }
          />
          {sidebar_title}
        </h6>
        {incomingData.map((data) => (
          <div key={data._id}>
            <div className="flex grow flex-row gap-2 pb-1 pt-4 font-pop-m text-[14px]">
              <p className="w-full">{data.categoryType}</p>
              <p className="flex items-center text-right font-pop-sb">
                <FaIndianRupeeSign /> <span>{data.totalExpenseAmount}</span>
              </p>
            </div>
            <div className="h-1.5 w-[100%] rounded-full bg-[#d1d5db]">
              <div
                style={spendBar(data.totalExpenseAmount)}
                className={
                  sidebar_for === navVars.EXPENSE
                    ? "h-full rounded-full bg-travel"
                    : "h-full rounded-full bg-income"
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

SideBar.propTypes = {
  sidebar_title: PropTypes.string,
  incomingData: PropTypes.array,
  totalSum: PropTypes.number,
  sidebar_for: PropTypes.string,
};
