import { useMemo } from "react";
import { useSelector } from "react-redux";

const useMinMax = () => {
  const MinMaxData = useSelector((state) => state.MM.data);

  const MMofMonth = useMemo(() => {
    if (!Array.isArray(MinMaxData)) return null;
    return MinMaxData.map((mm) => ({
      year: mm.year,
      min: mm.minMonth,
      max: mm.maxMonth,
    }));
  }, [MinMaxData]);

  const MMofPrime = useMemo(() => {
    if (!Array.isArray(MinMaxData)) return null;
    return MinMaxData.map((mm) => ({
      year: mm.year,
      min: mm.minPrime,
      max: mm.maxPrime,
    }));
  }, [MinMaxData]);

  const MMofSub = useMemo(() => {
    if (!Array.isArray(MinMaxData)) return null;
    return MinMaxData.map((mm) => ({
      year: mm.year,
      min: mm.minSub,
      max: mm.maxSub,
    }));
  }, [MinMaxData]);

  return {};
};

export default useMinMax;
