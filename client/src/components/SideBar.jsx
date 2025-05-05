import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiTagSimpleFill } from "react-icons/pi";
import { PATH } from "@/router/routerConfig";
import { FaChartBar } from "react-icons/fa";

const SideBar = ({ sidebar_title, incomingData, totalSum, sidebar_for }) => {
  const spendBar = (inputAmount) => {
    let p = Math.round((inputAmount / totalSum) * 100);
    return {
      width: `${p}%`,
    };
  };

  return (
    <>
      <div className="flex flex-col gap-4 ">
        <h6 className="flex items-center gap-2 text-base font-medium">
          <FaChartBar />
          {sidebar_title}
        </h6>
        {incomingData.map((data) => (
          <div key={data._id} className="text-sm">
            <div className="flex gap-2 pb-1">
              <p className="w-full">{data.categoryName}</p>
              <p className="flex items-center">
                <FaIndianRupeeSign /> <span>{data.categoryTotal}</span>
              </p>
            </div>
            <div className="h-1.25 w-full rounded-full bg-[#ffffff]">
              <div
                style={spendBar(data.categoryTotal)}
                className={
                  sidebar_for === PATH.expense
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
