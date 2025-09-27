import { ArrayCheck } from "@/components/utility";
import { filterByExpense } from "@/components/utilityFilter";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useMinMaxConfig = () => {
  const { MinMaxData, MinMaxLoading, MinMaxError } = useSelector(
    (state) => state.MM,
  );

  const MMofMonth = useMemo(() => {
    const minmax = ArrayCheck(MinMaxData);
    if (!minmax) return null;
    return minmax.map((mm) => ({
      year: mm.year,
      min: mm.minMonth,
      max: mm.maxMonth,
    }));
  }, [MinMaxData]);

  const MMofPrime = useMemo(() => {
    const minmax = ArrayCheck(MinMaxData);
    if (!minmax) return null;
    return minmax.map((mm) => ({
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
    const minmax = ArrayCheck(MinMaxData);
    if (!minmax) return null;
    return minmax.map((mm) => ({
      year: mm.year,
      min: mm.minSub,
      max: mm.maxSub,
    }));
  }, [MinMaxData]);

  return { MMofPrime_EXP, MMgetPrimeofYear, MinMaxLoading, MinMaxError };
};

export default useMinMaxConfig;
