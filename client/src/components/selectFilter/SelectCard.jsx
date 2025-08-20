import { Icons } from "../icons";

const SelectCard = ({ title, children, isExpense, noIcon, className = "" }) => {
  return (
    <>
      <div
        className={`text-14px flex flex-row items-center gap-2 font-medium ${className} `}
      >
        {!noIcon && (
          <Icons.filter
            className={`${isExpense ? "text-exp text-16px" : "text-inc text-16px"}`}
          />
        )}
        {title && <button className="tracking-wide">{title}</button>}
        <div className="flex"> {children}</div>
      </div>
    </>
  );
};

export default SelectCard;
