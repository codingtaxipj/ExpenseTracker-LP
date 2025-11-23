import { cardBgv2 } from "@/global/style";
import { cn } from "@/lib/utils";
import Flexrow from "../section/flexrow";

const SelectBar = ({ children, className }) => {
  return (
    <Flexrow className={cn("px-2.5 rounded-sm bg-dark-a3 items-center py-1.25", className)}>
      {children}
    </Flexrow>
  );
};

export default SelectBar;
