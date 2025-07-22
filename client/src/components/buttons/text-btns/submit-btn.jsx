import { Icons } from "../../icons";
import BaseBtn from "../base-btn";

const SubmitBtn = ({ ...props }) => {
  return (
    <BaseBtn {...props}>
      <span className="text-14"> Submit </span>
    </BaseBtn>
  );
};

export default SubmitBtn;
