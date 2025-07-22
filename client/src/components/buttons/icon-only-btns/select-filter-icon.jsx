import BaseIconBtn from "../base-icon-btn";
import { cn } from "@/lib/utils";

const SelectFilterIcon = ({ inactive, className, children, ...props }) => {
  const style = "bg-gradBot border border-br1 shadow-md shadow-shadowBlack";
  return (
    <BaseIconBtn {...props} className={cn(inactive && style, className)}>
      {children}
    </BaseIconBtn>
  );
};

export default SelectFilterIcon;
