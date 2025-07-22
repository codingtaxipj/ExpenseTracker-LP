import { cn } from "@/lib/utils";

const BaseIconBtn = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "text-16 cursor-pointer rounded-sm p-1.25 disabled:cursor-not-allowed disabled:opacity-80",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default BaseIconBtn;
