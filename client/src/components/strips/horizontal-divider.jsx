import { cn } from "@/lib/utils";

const HorizontalDivider = ({ className }) => {
  return <div className={cn("bg-91 flex h-[01px] flex-1", className)}></div>;
};

export default HorizontalDivider;
