import { cn } from "@/lib/utils";

const VerticalDevider = ({ className }) => {
  return <div className={cn("bg-91 h-[01px] flex flex-1", className)}></div>;
};

export default VerticalDevider;
