const BudgetMonth = ({ isOver, isUnder }) => {
  return (
    <>
      <div className="text-14 flex flex-row">
        <div className="bg-greyMedium flex items-center rounded-l-md py-1 pr-2.5 pl-4">
          {isOver && "Over Budget Months"}
          {isUnder && "Under Budget Months"}
        </div>
        <div className="bg-expense flex items-center rounded-r-md py-1 pr-4 pl-2.5">
          5
        </div>
      </div>
    </>
  );
};

export default BudgetMonth;
