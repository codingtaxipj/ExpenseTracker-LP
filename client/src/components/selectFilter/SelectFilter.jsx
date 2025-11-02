import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { expenseCategories } from "@/global/categories";
import { cn } from "@/lib/utils";
import moment from "moment";

const SelectFilter = ({
  list,
  isChart,
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
          {isChart &&
            list.map((item) => (
              <SelectItem
                key={item.id}
                value={item.categoryName}
                className={
                  "bg-dark-sec !text-slate-1 text-12px data-[highlighted]:bg-dark-s3 flex-inline mb-1 gap-2 font-medium"
                }
              >
                <span
                  className="flex h-3 w-3 shrink-0 rounded-xs"
                  style={{
                    backgroundColor: expenseCategories.find(
                      (e) => e.title === item.categoryName,
                    )?.color,
                  }}
                />
                {item.categoryName}
              </SelectItem>
            ))}
          {!isChart &&
            list.map((items, index) => (
              <SelectItem
                className={
                  "bg-dark-sec !text-slate-1 text-12px data-[highlighted]:bg-dark-s3 mb-1 font-medium"
                }
                key={index}
                value={String(items)}
              >
                {isMonth ? moment().month(items).format("MMM") : items}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectFilter;
