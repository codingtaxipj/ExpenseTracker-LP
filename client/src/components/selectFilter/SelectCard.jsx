import { Icons } from "../icons";

const SelectCard = ({ title, children, isExpense, noIcon, className = "" }) => {
  return (
    <>
      <div
        className={`text-14 flex flex-row items-center gap-2 font-medium ${className} `}
      >
        {!noIcon && (
          <Icons.filter
            className={`${isExpense ? "text-exptxt text-16" : "text-inctxt text-16"}`}
          />
        )}
        {title && <button className="tracking-wide">{title}</button>}
        <div className="flex"> {children}</div>
      </div>
    </>
  );
};

export default SelectCard;
