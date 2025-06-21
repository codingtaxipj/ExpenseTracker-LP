import { Icons } from "../icons";
import { amountInteger } from "../utilityFilter";

const BudgetStrip = ({ color, amount = 20000 }) => {
  return (
    <>
      <div className="text-16 flex h-7 flex-row items-center gap-1 rounded-md px-3 py-2 font-medium">
        <span className="mr-1.5">
          <Icons.calc className={color} />
        </span>
        <h4>Monthly Budget To Spend</h4>
        <span className="bg-91 mx-2 h-full w-[0.5px]"></span>
        <span className="italic">INR</span>
        <h4>{amountInteger(amount)}</h4>
      </div>
    </>
  );
};

export default BudgetStrip;
