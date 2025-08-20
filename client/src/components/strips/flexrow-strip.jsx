import { cn } from "@/lib/utils";

const FlexrowStrip = ({ className = "", children }) => {
  return (
    <div
      className={cn(
        "text-14px from-gradBot to-gradTop shadow-shadowBlack border-br1 flex cursor-pointer flex-row items-center justify-center gap-0.75 rounded-md border bg-gradient-to-t px-4 py-1 font-medium shadow",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FlexrowStrip;
