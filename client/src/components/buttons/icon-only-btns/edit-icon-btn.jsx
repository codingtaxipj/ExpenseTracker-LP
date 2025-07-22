import { Icons } from "../../icons";
import BaseIconBtn from "../base-icon-btn";

const EditIconBtn = ({ ...props }) => {
  return (
    <BaseIconBtn {...props}>
      <Icons.pencil />
    </BaseIconBtn>
  );
};

export default EditIconBtn;
