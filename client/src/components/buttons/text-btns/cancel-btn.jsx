import { Icons } from "../../icons";
import BaseBtn from "../base-btn";

const CancelBtn = ({ ...props }) => {
  return (
    <BaseBtn {...props} className={"bg-rr"}>
      <span className="text-14px"> Cancel</span>
    </BaseBtn>
  );
};

export default CancelBtn;
