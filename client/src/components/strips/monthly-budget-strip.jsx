import React from "react";
import TooltipStrip from "./tooltip-strip";
import { getMonthName } from "@/utilities/calander-utility";
import Flexrow from "../section/flexrow";
import ColorDot from "./color-dot";
import HorizontalDivider from "./horizontal-divider";
import { Icons } from "../icons";
import { amountInteger, percentSigned } from "../utilityFilter";
import FlexrowStrip from "./flexrow-strip";

const MonthlyBudgetStrip = ({ budget, month, amount, isExpense, isIncome }) => {
  const diff = budget && amount - budget;
  const percent = budget && (diff / budget) * 100;
  return (
    <TooltipStrip
      content={
        budget
          ? `${getMonthName(month, "MMMM")}'s Budget is ${budget}`
          : `No Budget Exists For ${getMonthName(month, "MMMM")}`
      }
    >
      <div>
        <FlexrowStrip>
          <ColorDot className={"bg-budget"} />
          <h4>{getMonthName(month)}</h4>
          <HorizontalDivider />
          <span className="text-[12px]">
            <Icons.rupee />
          </span>
          <h4>{amountInteger(amount)}</h4>
          <HorizontalDivider />
          {isExpense && (
            <>
              {percent === 0 && (
                <span className="text-rr flex items-center gap-1.25">
                  No Budget Exist
                </span>
              )}
              {percent > 0 && (
                <span className="text-rr flex items-center gap-1.25">
                  {percentSigned(percent) + "%"} <Icons.graphup />
                </span>
              )}
              {percent < 0 && (
                <span className="text-gg flex items-center gap-1.25">
                  {percentSigned(percent) + "%"} <Icons.graphdown />
                </span>
              )}
            </>
          )}

          {isIncome && (
            <>
              {percent === 0 && (
                <span className="text-rr flex items-center gap-1.25">
                  No Budget Exist
                </span>
              )}
              {percent > 0 && (
                <span className="text-gg flex items-center gap-1.25">
                  {percentSigned(percent) + "%"} <Icons.graphup />
                </span>
              )}
              {percent < 0 && (
                <span className="text-rr flex items-center gap-1.25">
                  {percentSigned(percent) + "%"} <Icons.graphdown />
                </span>
              )}
            </>
          )}
        </FlexrowStrip>
      </div>
    </TooltipStrip>
  );
};

export default MonthlyBudgetStrip;
