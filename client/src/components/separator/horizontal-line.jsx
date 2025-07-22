import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";

const HorizontalLine = ({ className }) => {
  return (
    <Separator
      orientation="horizontal"
      className={cn("bg-91 my-2 h-px w-max", className)}
    />
  );
};

export default HorizontalLine;
