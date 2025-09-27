import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import Flexrow from "../section/flexrow";

const SelectCard = ({ title, children, isExpense, noIcon, className }) => {
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
            className={`${isExpense ? "text-exp-t text-16px" : "text-inc text-16px"}`}
          />
        )}
        {title && <button className="tracking-wide">{title}</button>}
        <Flexrow className="w-max"> {children}</Flexrow>
      </Flexrow>
    </>
  );
};

export default SelectCard;
