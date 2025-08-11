import { filterByExpense } from "@/components/utilityFilter";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useMinMaxConfig = () => {
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
      isTypeExpense: mm.isTypeExpense,
    }));
  }, [MinMaxData]);

  const MMofPrime_EXP = filterByExpense(MMofPrime);
  const MMgetPrimeofYear = (list, year) =>
    list?.find((l) => l.year === year) ?? [];

  const MMofSub = useMemo(() => {
    if (!Array.isArray(MinMaxData)) return null;
    return MinMaxData.map((mm) => ({
      year: mm.year,
      min: mm.minSub,
      max: mm.maxSub,
    }));
  }, [MinMaxData]);

  return { MMofPrime_EXP, MMgetPrimeofYear };
};

export default useMinMaxConfig;
