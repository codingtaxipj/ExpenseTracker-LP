import { Icons } from "../../icons";
import BaseIconBtn from "../base-icon-btn";

const GotoIconBtn = ({ ...props }) => {
  return (
    <BaseIconBtn {...props}>
      <Icons.share />
    </BaseIconBtn>
  );
};

export default GotoIconBtn;
