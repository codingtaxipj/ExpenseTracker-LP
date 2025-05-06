import { BsDatabaseFillAdd } from "react-icons/bs";
import { TiArrowForward } from "react-icons/ti";

export const AddTripExpenseCard = () => {
  return (
    <>
      <div className="border-grey-border flex w-1/2 flex-col gap-2 rounded-md border p-5">
        <div className="flex items-center gap-2 text-sm">
          <BsDatabaseFillAdd />
          <span>Trip Expense</span>
        </div>
        <button className="bg-travel w-full rounded-sm px-4 py-1 text-sm font-medium">
          Add Now
        </button>
      </div>
    </>
  );
};

export const CheckAnalysisCard = ({ isExpense = true }) => {
  return (
    <>
      <div className="border-grey-border flex w-1/2 flex-col gap-2 rounded-md border p-5">
        <div className="flex items-center gap-2 text-sm">
          <TiArrowForward />
          {isExpense ? (
            <span>Check Expense Analysis</span>
          ) : (
            <span>Check Income Analysis</span>
          )}
        </div>
        {isExpense ? (
          <button className="bg-expense w-full rounded-sm px-4 py-1 text-sm font-medium">
            Check Now
          </button>
        ) : (
          <button className="bg-income w-full rounded-sm px-4 py-1 text-sm font-medium">
            Check Now
          </button>
        )}
      </div>
    </>
  );
};
