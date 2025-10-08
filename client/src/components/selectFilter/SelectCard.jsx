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
        className={cn(
          "text-14px w-max items-center gap-2.5 font-medium",
          className,
        )}
      >
        {!noIcon && (
          <Icons.filter
            className={cn("text-16px", {
              "text-exp-a1": isExpense,
              "text-inc-a1": !isExpense,
              "text-rep-a1": isReccuring,
              "text-trip-a1": isTrip,
            })}
          />
        )}
        {title && <button className="tracking-wide">{title}</button>}
        <Flexrow className="w-max"> {children}</Flexrow>
      </Flexrow>
    </>
  );
};

export default SelectCard;
