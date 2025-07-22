import { cn } from "@/lib/utils";
import Flexrow from "../section/flexrow";

const BaseBtn = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "cursor-pointer rounded-md px-5 py-1 disabled:cursor-not-allowed disabled:opacity-80",
        className,
      )}
    >
      <Flexrow className="items-center gap-1.5"> {children}</Flexrow>
    </button>
  );
};

export default BaseBtn;
