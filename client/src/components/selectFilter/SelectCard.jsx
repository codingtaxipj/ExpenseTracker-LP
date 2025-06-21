import { Icons } from "../icons";

const SelectCard = ({ title, children, isExpense }) => {
  return (
    <>
      <div className="text-14 flex flex-row items-center gap-0.5 pl-2.5 font-medium">
        <Icons.filter className={isExpense ? "text-exptxt text-16" : "text-inctxt text-16"} />
        <button className="px-1.5 tracking-wide">{title}</button>
        <div className="flex pr-2"> {children}</div>
      </div>
    </>
  );
};

export default SelectCard;
