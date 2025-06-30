const ExpButton = ({ btnfor, label, className = "", ...props }) => {
  const color = {
    expense: "bg-exp hover:bg-exp",
    income: "bg-inc hover:bg-inc",
    cancel: "bg-rrbg hover:bg-rrbg",
    expenseInactive:
      "bg-gradBot hover:bg-exp border border-br1 shadow-md shadow-shadowBlack",
    incomeInactive:
      "bg-gradBot hover:bg-inc border border-br1 shadow-md shadow-shadowBlack",
  };

  const getColor = (val) => color[val] || "bg-exp hover:bg-exp";

  return (
    <>
      <button
        {...props}
        className={`${getColor(btnfor)} cursor-pointer rounded-md px-5 py-1 disabled:cursor-not-allowed disabled:opacity-80 ${className}`}
      >
        {label}
      </button>
    </>
  );
};

export default ExpButton;
