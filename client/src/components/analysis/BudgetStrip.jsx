import { FaCalculator } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

const BudgetStrip = () => {
  return (
    <>
      <div className="bg-expense text-14 flex h-7 flex-row items-center gap-1 rounded-md px-3 py-2">
        <span className=" mr-1.5">
          <FaCalculator />
        </span>
        <h4>Monthly Budget</h4>
        <span className="bg-white mx-2 h-full w-[0.5px]"></span>
        <span className="text-[12px]">
             <FaIndianRupeeSign />
        </span>
        <h4>200</h4>
      </div>
    </>
  );
};

export default BudgetStrip;
