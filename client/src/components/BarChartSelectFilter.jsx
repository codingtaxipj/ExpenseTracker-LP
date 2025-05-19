import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BarChartSelectFilter = ({ list }) => {
  return (
    <>
      <Select>
        <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
          <SelectValue placeholder="Sort By Type" />
        </SelectTrigger>
        <SelectContent className="w-40">
          {list.map((items) => (
            <SelectItem key={items.value} value={String(items.value)}>
              {items.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default BarChartSelectFilter;
