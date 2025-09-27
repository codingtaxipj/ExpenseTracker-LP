import React from "react";
import TooltipStrip from "./tooltip-strip";
import Flexrow from "../section/flexrow";
import ColorDot from "./color-dot";
import HorizontalDivider from "./horizontal-divider";
import { Icons } from "../icons";
import { amountFloat } from "../utilityFilter";
import FlexrowStrip from "./flexrow-strip";
import { CurrentMonth } from "@/utilities/calander-utility";

const BudgetPercentStrip = ({ data }) => {
  return data.map((d) => (
    <>
      <FlexrowStrip
        key={d.id}
        className={`${d.id === CurrentMonth() ? "bg-exp" : ""} text-12px`}
      >
        <Flexrow className="w-max items-center gap-1">
          <span className="text-14px">
            <Icons.checkCircle
              className={`${d.id === CurrentMonth() ? "text-white" : "text-exp-t"}`}
            />
          </span>
          <span>{d.month}</span>
        </Flexrow>

        <HorizontalDivider className="bg-white" />
        <Flexrow className="w-max items-center gap-1">
          <span className="text-12px">
            <Icons.rupee />
          </span>
          <span>{amountFloat(d.expense)}</span>
        </Flexrow>
        <HorizontalDivider className="bg-white" />
        <Flexrow
          className={`w-max items-center gap-1 ${d.id === CurrentMonth() ? "text-white" : d.percent <= 0 ? "text-gg" : "text-rr"}`}
        >
          <span>{d.percent}%</span>
          <span className="text-12px">
            {d.percent < 0 && <Icons.graphdown />}
            {d.percent > 0 && <Icons.graphup />}
          </span>
        </Flexrow>
      </FlexrowStrip>
    </>
  ));
};

export default BudgetPercentStrip;
