import React from "react";
import { Icons } from "../icons";
import { amountFloat } from "../utilityFilter";
import Flexrow from "../section/flexrow";
import HorizontalDivider from "./horizontal-divider";
import FlexrowStrip from "./flexrow-strip";

const MinMaxStrip = ({
  isExpense,
  isIncome,
  isMax,
  isMin,
  amount = 0,
  date = "Jun/25",
}) => {
  return (
    <>
      <FlexrowStrip>
        {isExpense && (
          <>
            <Flexrow className={`text-explight items-center !gap-1`}>
              {isMax && (
                <>
                  <Icons.asc />
                  MAX Spend
                </>
              )}
              {isMin && (
                <>
                  <Icons.desc />
                  MIN Spend
                </>
              )}
            </Flexrow>
          </>
        )}

        {isIncome && (
          <>
            <Flexrow className={`text-inc items-center !gap-1`}>
              {isMax && (
                <>
                  <Icons.asc />
                  MAX Earned
                </>
              )}
              {isMin && (
                <>
                  <Icons.desc />
                  MIN Earned
                </>
              )}
            </Flexrow>
          </>
        )}

        <HorizontalDivider />
        <h4>{date}</h4>
        <HorizontalDivider />
        <span className="text-12">
          <Icons.rupee />
        </span>
        <h4>{amountFloat(amount)}</h4>
      </FlexrowStrip>
    </>
  );
};

export default MinMaxStrip;
