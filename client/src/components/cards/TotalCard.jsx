import { Icons } from "../icons";
import { amountFloat } from "../utilityFilter";
import { cn } from "@/lib/utils";
import { cardBg } from "@/global/style";
import Flexcol from "../section/flexcol";
import Flexrow from "../section/flexrow";

const TotalCard = ({ date, total, footerText, headText, color, className }) => {
  return (
    <>
      <Flexcol
        className={cn(
          "text-[14px] min-h-[10rem] w-[20rem] justify-normal gap-2 p-5",
          cardBg,
          className,
        )}
      >
        {/** ===== top section ===== */}
        <Flexrow className="font-para-b justify-between">
          <Flexrow className="w-max items-center gap-2">
            <Icons.upbar className={cn(color)} />
            {headText}
          </Flexrow>
          <Flexrow className="w-max items-center justify-end gap-2">
            <Icons.yearCal className={cn(color)} />
            {date}
          </Flexrow>
        </Flexrow>
        {/** ===== middle section ===== */}
        <Flexrow className="text-32px items-center gap-0.5 font-para-bb">
          <Icons.rupee />
          {amountFloat(total)}
        </Flexrow>
        {/** ===== bottom section ===== */}
        <Flexrow className={"py-1 font-para-r"}>{footerText}</Flexrow>
      </Flexcol>
    </>
  );
};

export default TotalCard;
