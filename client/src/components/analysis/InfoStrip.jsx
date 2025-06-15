import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaIndianRupeeSign,
} from "react-icons/fa6";

const InfoStrip = () => {
  return (
    <>
      <div className="bg-greyBlack text-14 flex flex-row items-center gap-1 rounded-md px-3 h-7 py-2">
        <span className="bg-expense size-3 rounded-full mr-1.5"></span>
        <h4 >Month</h4>
        <span className="bg-dimText mx-2 h-full w-[0.5px]"></span>
        <span>
          <FaIndianRupeeSign />
        </span>
        <h4>200</h4>
        <span className="bg-dimText mx-2 h-full w-[0.5px]"></span>

        <span className="text-income" > 5 %</span>

        <span className="text-income    ">
          <FaArrowTrendUp />
        </span>
      </div>
    </>
  );
};

export default InfoStrip;
