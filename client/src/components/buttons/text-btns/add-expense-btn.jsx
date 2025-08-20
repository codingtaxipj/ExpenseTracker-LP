import { Icons } from "../../icons";
import BaseBtn from "../base-btn";

const AddExpenseBtn = ({ ...props }) => {
  return (
    <BaseBtn {...props} className={"bg-exp"}>
      <span className="text-16px">
        <Icons.addCircle />
      </span>
      <span className="text-14px"> Add Expense</span>
    </BaseBtn>
  );
};

export default AddExpenseBtn;
