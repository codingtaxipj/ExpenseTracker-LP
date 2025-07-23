import { useMemo } from "react";
import { useSelector } from "react-redux";

const useMinMax = () => {
  const MinMaxData = useSelector((state) => state.MM.expenseMMData);

  const DataOfMM = useMemo(() => {
    if (!Array.isArray(MinMaxData)) return null;
    return MinMaxData;
  }, [MinMaxData]);

  const MonthListOfMM = useMemo(() => {
    if (!Array.isArray(DataOfMM)) return null;
    return DataOfMM.map((mm) => ({
      year: mm.year,
      min: mm.minMonth,
      max: mm.maxMonth,
    }));
  }, [DataOfMM]);

  const PrimeListOfMM = useMemo(() => {
    if (!Array.isArray(DataOfMM)) return null;
    return DataOfMM.map((mm) => ({
      year: mm.year,
      min: mm.minPrime,
      max: mm.maxPrime,
    }));
  }, [DataOfMM]);

  const SubListOfMM = useMemo(() => {
    if (!Array.isArray(DataOfMM)) return null;
    return DataOfMM.map((mm) => ({
      year: mm.year,
      min: mm.minSub,
      max: mm.maxSub,
    }));
  }, [DataOfMM]);

  const getMM_primeofyear = (year) =>
    PrimeListOfMM?.find((mm) => mm.year === year);

  const getMM_monthofyear = (year) =>
    MonthListOfMM?.find((mm) => mm.year === year);

  const getMM_subofyear = (year) => SubListOfMM?.find((mm) => mm.year === year);

  return {
    DataOfMM,
    MonthListOfMM,
    PrimeListOfMM,
    SubListOfMM,
    getMM_monthofyear,
    getMM_primeofyear,
    getMM_subofyear,
  };
};

export default useMinMax;
