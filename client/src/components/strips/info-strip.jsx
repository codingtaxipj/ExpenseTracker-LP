import { Icons } from "../icons";
import { amountInteger, percentSigned } from "../utilityFilter";
import FlexrowStrip from "./flexrow-strip";
import HorizontalDivider from "./horizontal-divider";

const InfoStrip = ({ color, isExpense, isIncome, amount, date = "Jun" }) => {
  const percent = amount;
  return (
    <>
      <FlexrowStrip>
        <span className={`${color} mr-1 size-3 rounded-full`}></span>
        <h4>{date}</h4>
        <HorizontalDivider />
        <span className="text-[12px]">
          <Icons.rupee />
        </span>
        <h4>{amountInteger(amount * 200)}</h4>
        <HorizontalDivider />

        {isExpense && (
          <>
            {percent >= 0 && (
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
            {percent >= 0 && (
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
