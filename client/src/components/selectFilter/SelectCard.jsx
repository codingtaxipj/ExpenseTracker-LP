import { MdFilterAlt } from "react-icons/md";

const SelectCard = ({ title, children, isExpense }) => {
  return (
    <>
      <MdFilterAlt className={isExpense ? "text-expense" : "text-income"} />
      <button className="pr-2 text-sm">{title}</button>
      <div> {children}</div>
    </>
  );
};

export default SelectCard;
