import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaIndianRupeeSign,
} from "react-icons/fa6";

const InfoStrip = () => {
  return (
    <>
      <div className="bg-greyBlack text-14 flex h-7 flex-row items-center gap-1 rounded-md px-3 py-1.75">
        <span className="bg-expense mr-1.5 size-3 rounded-full"></span>
        <h4>Month</h4>
        <span className="bg-dimText mx-2 h-full w-[0.5px]"></span>
        <span className="text-[12px]">
          <FaIndianRupeeSign />
        </span>
        <h4>200</h4>
        <span className="bg-dimText mx-2 h-full w-[0.5px]"></span>

        <span className="text-income"> 5 %</span>

        <span className="text-income">
          <FaArrowTrendUp />
        </span>
      </div>
    </>
  );
};

export default InfoStrip;
