import { cn } from "@/lib/utils";

const HorizontalDivider = ({ className }) => {
  return <div className={cn("bg-91 mx-2 h-3 w-[0.5px]", className)}></div>;
};

export default HorizontalDivider;
