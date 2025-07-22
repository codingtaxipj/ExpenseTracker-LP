import moment from "moment";
import { Icons } from "../icons";
import { amountInteger, percentSigned } from "../utilityFilter";
import FlexrowStrip from "./flexrow-strip";
import HorizontalDivider from "./horizontal-divider";

const InfoStrip = ({ color, budget, month, isExpense, isIncome, amount }) => {
  const diff = budget && amount - budget;
  const percent = budget && (diff / budget) * 100;
  return (
    <>
      <FlexrowStrip>
        <span className={`${color} mr-1 size-3 rounded-full`}></span>
        <h4>{moment().month(month).format("MMM")}</h4>
        <HorizontalDivider />
        <span className="text-[12px]">
          <Icons.rupee />
        </span>
        <h4>{amountInteger(amount)}</h4>
        <HorizontalDivider />

        {isExpense && (
          <>
           {percent === 0 && (
              <>
                <span className="text-rr flex items-center gap-1.25">
                  No Budget Exist
                </span>
              </>
            )}
            {percent > 0 && (
              <>
                <span className="text-rr flex items-center gap-1.25">
                  {percentSigned(percent) + "%"} <Icons.graphup />
                </span>
              </>
            )}
            {percent < 0 && (
              <>
                <span className="text-gg flex items-center gap-1.25">
                  {percentSigned(percent) + "%"} <Icons.graphdown />
                </span>
              </>
            )}
          </>
        )}

        {isIncome && (
          <>
           {percent === 0 && (
              <>
                <span className="text- flex items-center gap-1.25">
                  No Budget Exist
                </span>
              </>
            )}
            {percent > 0 && (
              <>
                <span className="text-gg flex items-center gap-1.25">
                  {percentSigned(percent) + "%"} <Icons.graphup />
                </span>
              </>
            )}
            {percent < 0 && (
              <>
                <span className="text-rr flex items-center gap-1.25">
                  {percentSigned(percent) + "%"} <Icons.graphdown />
                </span>
              </>
            )}
          </>
        )}
      </FlexrowStrip>
    </>
  );
};

export default InfoStrip;
