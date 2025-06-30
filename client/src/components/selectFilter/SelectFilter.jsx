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
        <SelectTrigger className="bg-darkBlack min-w-50 rounded-md border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="min-w-45">
          {list.map((items) => {
            return (
              <SelectItem key={items} value={String(items)}>
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
