import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import Flexrow from "../section/flexrow";

const SelectCard = ({
  title,
  children,
  isExpense,
  isReccuring,
  isTrip,
  noIcon,
  className,
}) => {
  return (
    <>
      <Flexrow
        className={cn("!text-14px font-para2-b items-center gap-2 w-max", className)}
      >
        {title && <span>{title}</span>}
        {children}
      </Flexrow>
    </>
  );
};

export default SelectCard;
