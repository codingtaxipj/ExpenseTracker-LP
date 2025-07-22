import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
const VerticalLine = ({ className }) => {
  return (
    <Separator
      orientation="vertical"
      className={cn("bg-91 mx-2 h-5 w-px", className)}
    />
  );
};

export default VerticalLine;
