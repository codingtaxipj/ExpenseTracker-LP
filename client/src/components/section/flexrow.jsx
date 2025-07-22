import { cn } from "@/lib/utils";

const Flexrow = ({ children, className }) => {
  return (
    <>
      <div className={cn("flex w-full flex-row gap-5", className)}>
        {children}
      </div>
    </>
  );
};

export default Flexrow;
