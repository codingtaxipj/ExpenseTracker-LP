import ExpButton from "../custom-ui/expButton";
import { Icons } from "../icons";
import { amountInteger } from "../utilityFilter";

const BudgetStrip = ({ amount, className = "" }) => {
  return (
    <>
      <div
        className={`text-16 flex h-7 flex-row items-center gap-1 rounded-md font-medium ${className}`}
      >
        <span className="mr-1.5">
          <Icons.calc className={`text-budget`} />
        </span>

        {amount && (
          <>
            <h4>Monthly Budget To Spend</h4>
            <span className="bg-91 mx-2 h-full w-[0.5px]"></span>
            <span className="italic">INR</span>
            <h4>{amountInteger(amount)}</h4>
          </>
        )}

        {!amount && (
          <>
            <h4>You Haven't Set Any Budget</h4>
            <span className="bg-91 mx-2 h-full w-[0.5px]"></span>
            <ExpButton
              btnfor="budget"
              className="font-normal"
              label="Set Budget"
            />
          </>
        )}
      </div>
    </>
  );
};

export default BudgetStrip;
