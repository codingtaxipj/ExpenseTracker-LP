import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";

const BarChartSelectFilter = ({
  list,
  handleSelect,
  defaultSelected,
  listforMonth,
}) => {
  return (
    <>
      <Select value={String(defaultSelected)} onValueChange={handleSelect}>
        <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
          <SelectValue placeholder="Sort By Type" />
        </SelectTrigger>
        <SelectContent className="max-h-100 w-40">
          {list.map((items) => (
            <SelectItem key={items} value={String(items)}>
              {listforMonth ? moment().month(items).format("MMMM") : items}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default BarChartSelectFilter;
