import React from "react";
import Flexrow from "../section/flexrow";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

const EButton = ({
  as = "button",
  isIcon,
  isTextIcon,
  isText,
  className,
  addExpense,
  addIncome,
  addTrip,
  setBudget,
  editIcon,
  gotoIcon,
  viewIcon,
  deleteIcon,
  children,
  ...props
}) => {
  const padding =
    (isIcon && "p-2.25 !text-18px rounded-sm") ||
    (isTextIcon && "px-5 py-2 !text-14px") ||
    (isText && "px-5 py-2 !text-14px");

  const bgColor =
    (addExpense && "bg-exp-a3 text-dark-a1") ||
    (addTrip && "bg-trip") ||
    (addIncome && "bg-inc-b") ||
    (setBudget && "bg-bud-a2 text-dark-a1");

  const Component = as;

  return (
    <Component
      {...props}
      className={cn(
        "flex cursor-pointer flex-row items-center justify-center gap-1.5 rounded-md font-medium",
        padding,
        bgColor,
        className,
      )}
    >
      {children && children}
      {isTextIcon && (
        <>
          {addExpense && (
            <>
              <Icons.add_plus className="!text-18px" />
              <span>Add Expense</span>
            </>
          )}
          {addTrip && (
            <>
              <Icons.add_plus className="!text-18px" />
              <span>Create Trip</span>
            </>
          )}
          {addIncome && (
            <>
              <Icons.add_plus className="!text-18px" />
              <span>Add Expense</span>
            </>
          )}
          {setBudget && (
            <>
              <Icons.add_plus className="!text-18px" />
              <span>Set Budget</span>
            </>
          )}
        </>
      )}
      {isIcon && (
        <>
          {editIcon && <Icons.edit />}
          {gotoIcon && <Icons.gotoPage />}
          {viewIcon && <Icons.view />}
          {deleteIcon && <Icons.delete_bin />}
        </>
      )}
    </Component>
  );
};

export default EButton;
