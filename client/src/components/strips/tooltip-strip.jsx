import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const TooltipStrip = ({ children, content = "Tooltip Text", className }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        fill="fill-white bg-white"
        className={cn("font-14 bg-white text-black", className)}
      >
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipStrip;
