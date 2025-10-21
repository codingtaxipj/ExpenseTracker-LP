import { cn } from "@/lib/utils";

const VerticalDevider = ({ className }) => {
  return <div className={cn("bg-slate-a1 h-3 w-[0.5px]", className)}></div>;
};

export default VerticalDevider;
