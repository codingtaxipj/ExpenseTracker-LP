import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";

const SelectFilter = ({
  list,
  placeholder,
  onValueChange,
  defaultValue,
  value,
  isMonthSelect = false,
  ...props
}) => {
  return (
    <>
      <Select
        {...props}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="bg-dark-prime text-12px data-[placeholder]:text-slate-1 [&_svg:not([class*='text-'])]:text-slate-1 min-w-50 rounded-md border-0 focus-visible:ring-[0px] data-[size=default]:h-7 [&_svg]:opacity-100">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent  className="bg-dark-prime shadow-dark-p2 min-w-45 border-0">
          {list.map((items, index) => {
            return (
              <SelectItem
                className={
                  "bg-dark-sec !text-slate-1 text-12px mb-1 font-medium data-[highlighted]:bg-dark-s3"
                }
                key={index}
                value={String(items)}
              >
                {isMonthSelect ? moment().month(items).format("MMMM") : items}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectFilter;
