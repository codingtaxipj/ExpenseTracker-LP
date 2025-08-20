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
  setBudget,
  editIcon,
  gotoIcon,
  viewIcon,
  deleteIcon,
  children,
  ...props
}) => {
  const padding =
    (isIcon && "p-1.25 !text-16px rounded-sm") ||
    (isTextIcon && "px-5 py-1 !text-14px") ||
    (isText && "px-5 py-1 !text-14px");

  const bgColor =
    (addExpense && "bg-exp") ||
    (addIncome && "bg-inc") ||
    (setBudget && "bg-budget");

  const Component = as;

  return (
    <Component
      {...props}
      className={cn(
        "flex cursor-pointer flex-row items-center justify-center gap-1 rounded-md font-medium text-white",
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
              <Icons.addCircle />
              <span>Add Expense</span>
            </>
          )}
          {addIncome && (
            <>
              <Icons.addCircle />
              <span>Add Expense</span>
            </>
          )}
          {setBudget && (
            <>
              <Icons.addCircle />
              <span>Set Budget</span>
            </>
          )}
        </>
      )}
      {isIcon && (
        <>
          {editIcon && <Icons.pencil />}
          {gotoIcon && <Icons.gotoPage />}
          {viewIcon && <Icons.view />}
          {deleteIcon && <Icons.toDelete />}
        </>
      )}
    </Component>
  );
};

export default EButton;
