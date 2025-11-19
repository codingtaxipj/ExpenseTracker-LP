import { getPrimeColor } from "@/global/categories";
import IconAvatar from "./IconAvatar";
import { cn } from "@/lib/utils";

const IconCircle = ({ setIcon, bgColor, className }) => {
  return (
    <>
      <div
        className={cn(
          "!text-28px flex w-fit items-center justify-center rounded-md p-2.5 text-white",
          className,
        )}
        style={{ backgroundColor: getPrimeColor(bgColor) }}
      >
        <IconAvatar icon={setIcon} />
      </div>
    </>
  );
};

export default IconCircle;
