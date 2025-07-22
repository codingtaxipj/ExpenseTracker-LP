import { Icons } from "../../icons";
import BaseIconBtn from "../base-icon-btn";

const NewBudgetIconBtn = ({ ...props }) => {
  return (
    <BaseIconBtn {...props}>
      <Icons.calnew />
    </BaseIconBtn>
  );
};
export default NewBudgetIconBtn;
