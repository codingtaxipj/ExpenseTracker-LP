import { btnVars } from "@/global/global-variables";

const Button = ({ btnStyle, btnType = "button", children, ...props }) => {
  const style = () => {
    switch (btnStyle) {
      case btnVars.expense:
        return "bg-expense cursor-pointer rounded-md px-5 py-1 text-sm font-medium text-white shadow-xs disabled:cursor-not-allowed disabled:opacity-80";
      case btnVars.income:
        return "g-income cursor-pointer rounded-md px-5 py-1 text-sm font-medium text-white shadow-xs disabled:cursor-not-allowed disabled:opacity-80";
    }
  };
  return (
    <button {...props} type={btnType} className={style()}>
      {children}
    </button>
  );
};

export default Button;
