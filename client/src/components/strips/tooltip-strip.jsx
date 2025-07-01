import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipStrip = ({ children, content = "Tooltip Text" }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        fill="fill-white bg-white"
        className={`bg-white text-black`}
      >
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipStrip;
