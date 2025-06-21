const BudgetMonth = ({ isOver, isUnder }) => {
  const color = isOver ? "bg-rrbg" : "bg-ggbg";
  return (
    <>
      <div className="text-14 flex flex-row">
        <div className="from-gradBot to-gradTop border-br1 shadow-shadowBlack flex items-center rounded-l-md border bg-gradient-to-t py-1 pr-2.5 pl-4 shadow-md">
          {isOver && "Over Budget Months"}
          {isUnder && "Under Budget Months"}
        </div>
        <div
          className={`${color} flex items-center rounded-r-md py-1 pr-4 pl-2.5`}
        >
          5
        </div>
      </div>
    </>
  );
};

export default BudgetMonth;
