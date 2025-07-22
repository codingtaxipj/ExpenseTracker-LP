const ExpButton = ({ isIcon, btnfor, label, className = "", ...props }) => {
  const color = {
    expense: "bg-exp ",
    income: "bg-inc ",
    cancel: "bg-rr ",
    success: "bg-gg ",
    trip: "bg-trip ",
    budget: "bg-budget ",
    expenseInactive:
      "bg-gradBot hover:bg-exp border border-br1 shadow-md shadow-shadowBlack",
    incomeInactive:
      "bg-gradBot hover:bg-inc border border-br1 shadow-md shadow-shadowBlack",
  };

  const getColor = (val) => color[val];

  return (
    <>
      {isIcon && (
        <button
          {...props}
          className={`${getColor(btnfor)} text-16 cursor-pointer rounded-sm size-6.25 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-80 ${className}`}
        >
          {label}
        </button>
      )}
      {!isIcon && (
        <button
          {...props}
          className={`${getColor(btnfor)} text-14 cursor-pointer rounded-md px-5 py-1 disabled:cursor-not-allowed disabled:opacity-80 ${className}`}
        >
          {label}
        </button>
      )}
    </>
  );
};

export default ExpButton;
