import { Icons } from "../../icons";
import BaseBtn from "../base-btn";

const SetBudgetBtn = ({ ...props }) => {
  return (
    <BaseBtn {...props} className={"bg-budget"}>
      <span className="text-16px">
        <Icons.calnew />
      </span>
      <span className="text-14px"> Set Budget</span>
    </BaseBtn>
  );
};

export default SetBudgetBtn;
