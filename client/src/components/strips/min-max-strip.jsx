import React from "react";
import { Icons } from "../icons";
import { amountFloat } from "../utilityFilter";
import Flexrow from "../section/flexrow";
import HorizontalDivider from "./horizontal-divider";
import FlexrowStrip from "./flexrow-strip";
import { getMonthName } from "@/utilities/calander-utility";

const MinMaxStrip = ({ data, isExpense, isIncome, isMax, isMin }) => {
  return (
    <>
      {data.total > 0 && (
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
          <h4>{`${getMonthName(data?.month, "MMMM")}`}</h4>
          <HorizontalDivider />
          <span className="text-12px">
            <Icons.rupee />
          </span>
          <h4>{amountFloat(data?.total)}</h4>
        </FlexrowStrip>
      )}
      {data.total <= 0 && <div>Data Not Exist</div>}
    </>
  );
};

export default MinMaxStrip;
