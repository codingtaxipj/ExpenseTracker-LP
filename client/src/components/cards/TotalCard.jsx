import { Icons } from "../icons";
import { amountFloat } from "../utilityFilter";
import { cn } from "@/lib/utils";
import { cardBg } from "@/global/style";
import Flexcol from "../section/flexcol";
import Flexrow from "../section/flexrow";

const TotalCard = ({ date, total, footerText, headText, color }) => {
  return (
    <>
      <Flexcol
        className={cn(
          "text-14px h-[10rem] w-[20rem] justify-between gap-2 p-5",
          cardBg,
        )}
      >
        {/** ===== top section ===== */}
        <Flexrow className="font-medium">
          <Flexrow className="items-center gap-2">
            <Icons.upbar className={cn(color)} />
            {headText}
          </Flexrow>
          <Flexrow className="w-max items-center justify-end gap-2">
            <Icons.yearCal className={cn(color)} />
            {date}
          </Flexrow>
        </Flexrow>
        {/** ===== middle section ===== */}
        <Flexrow className="text-32px items-center gap-0.5 font-bold">
          <Icons.rupee />
          {amountFloat(total)}
        </Flexrow>
        {/** ===== bottom section ===== */}
        <Flexrow className={"py-1"}>{footerText}</Flexrow>
      </Flexcol>
    </>
  );
};

export default TotalCard;
