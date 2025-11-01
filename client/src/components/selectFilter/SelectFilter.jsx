import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import moment from "moment";

const SelectFilter = ({
  list,
  placeholder,
  onValueChange,
  className,
  isMonth,
  value,
}) => {
  return (
    <>
      <Select value={String(value)} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn(
            "bg-dark-prime text-12px data-[placeholder]:text-slate-1 [&_svg:not([class*='text-'])]:text-slate-1 min-w-50 rounded-md border-0 focus-visible:ring-[0px] data-[size=default]:h-7 [&_svg]:opacity-100",
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-dark-prime shadow-dark-p2 min-w-45 border-0">
          {list.map((items, index) => {
            return (
              <SelectItem
                className={
                  "bg-dark-sec !text-slate-1 text-12px data-[highlighted]:bg-dark-s3 mb-1 font-medium"
                }
                key={index}
                value={String(items)}
              >
                {isMonth ? moment().month(items).format("MMM") : items}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectFilter;
