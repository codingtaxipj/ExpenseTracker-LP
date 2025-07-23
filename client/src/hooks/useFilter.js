import SelectFilter from "@/components/selectFilter/SelectFilter";

const useFilter = () => {
  //**  - For Year
  const handleYearSelector = (val) =>
    SelectFilter((prev) => ({ ...prev, byYear: val }));

  return { handleYearSelector };
};

export default useFilter;
