import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectMonthAsFilter = ({ mWeek, mdays, placeholder, onValueChange }) => {
  return (
    <Select defaultValue={mWeek} onValueChange={onValueChange}>
      <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-0 data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-40">
        <SelectItem value={mWeek}>Show in Weeks</SelectItem>
        <SelectItem value={mdays}>Show in Dates</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectMonthAsFilter;
