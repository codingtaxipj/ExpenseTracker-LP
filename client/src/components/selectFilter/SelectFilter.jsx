import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectFilter = ({ placeHolder, items }) => {
  return (
    <>
      <Select>
        <SelectTrigger className="bg-darkBlack w-40 border-0 text-xs focus-visible:ring-[0px] data-[placeholder]:text-white data-[size=default]:h-7 [&_svg]:opacity-100 [&_svg:not([class*='text-'])]:text-white">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent className="w-40">
          {items.map((data) => (
            <SelectItem key={data * 0.55} value={String(data)}>
              {data}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectFilter;
