import { BsBarChartFill, BsDatabaseFillAdd } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";

const TotalCard = ({ isExpense = true, cardFor = null }) => {
  const data = {};
  data.totalValue = 2000;

  if (cardFor.toLowerCase().trim() === "year") {
    data.title = isExpense ? "Last Year Expense" : "Last Year Income";
  }
  if (cardFor.toLowerCase().trim() === "month") {
    data.title = isExpense ? "Last Month Expense" : "Last Month Income";
  }
  if (cardFor.toLowerCase().trim() === "week") {
    data.title = isExpense ? "Last Week Expense" : "Last Week Income";
  }

  return (
    <>
      <div className="border-grey-border flex w-1/2 flex-col gap-2 rounded-md border p-5">
        <div className="flex items-center gap-2 text-sm">
          <BsBarChartFill />
          <span>{data.title}</span>
        </div>

        <div className="flex items-center gap-1 text-3xl font-bold">
          <FaIndianRupeeSign />
          <span>{data.totalValue}</span>
        </div>
      </div>
    </>
  );
};

export default TotalCard;
