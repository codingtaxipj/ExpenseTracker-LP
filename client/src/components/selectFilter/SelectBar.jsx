import { cardBgv2 } from "@/global/style";
import { cn } from "@/lib/utils";

const SelectBar = ({ children, className }) => {
  return (
    <div className={cn("flex w-max px-3.5 py-1", cardBgv2, "rounded-sm", className)}>
      {children}
    </div>
  );
};

export default SelectBar;
