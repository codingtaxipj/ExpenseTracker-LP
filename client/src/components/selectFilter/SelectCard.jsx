import { MdFilterAlt } from "react-icons/md";

const SelectCard = ({ title, children, isExpense }) => {
  return (
    <>
      <div className="flex flex-row items-center gap-1 pl-1.5">
        <MdFilterAlt className={isExpense ? "text-expense" : "text-income"} />
        <button className="pr-2 text-sm">{title}</button>
        <div className="flex flex-row gap-2"> {children}</div>
      </div>
    </>
  );
};

export default SelectCard;
