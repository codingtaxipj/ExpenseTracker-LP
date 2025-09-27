import { cardBg } from "@/global/style";
import { cn } from "@/lib/utils";
import Flexrow from "../section/flexrow";

const FlexrowStrip = ({ className = "", children }) => {
  return (
    <Flexrow
      className={cn(
        "",
        cardBg,
        className,
      )}
    >
      {children}
    </Flexrow>
  );
};

export default FlexrowStrip;
