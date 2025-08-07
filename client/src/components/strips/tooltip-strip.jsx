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
        className={cn("bg-white text-black font-14", className)}
      >
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipStrip;
