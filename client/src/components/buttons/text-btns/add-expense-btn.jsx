import { Icons } from "../../icons";
import BaseBtn from "../base-btn";

const AddExpenseBtn = ({ ...props }) => {
  return (
    <BaseBtn {...props} className={"bg-exp"}>
      <span className="text-16">
        <Icons.addCircle />
      </span>
      <span className="text-14"> Add Expense</span>
    </BaseBtn>
  );
};

export default AddExpenseBtn;
