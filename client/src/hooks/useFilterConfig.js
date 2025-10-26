import {
  filterTypes,
  selectCurrentFilter,
  setGlobalFilter,
} from "@/redux/slices/filter-slice";
import { useDispatch, useSelector } from "react-redux";
import useTotalConfig from "./useTotalConfig";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";

export const useFilterConfig = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectCurrentFilter);
  const { YearsList } = useTotalConfig();

  const MonthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const defaultYear = Number(currentFilter.values.year) ?? moment().year();
  const defaultMonth = Number(currentFilter.values.month) ?? moment().month();

  const FilterYear = defaultYear;
  const FilterMonth = defaultMonth;

  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);

  useEffect(() => {
    setYear(defaultYear);
    setMonth(defaultMonth);
  }, [defaultYear, defaultMonth]);

  const handleFilterChange = (newType) => {
    const currentValues = currentFilter.values;

    const newMonth = moment().month();
    const newYear = moment().year();
    setMonth(newMonth);
    setYear(newYear);

    if (newType === filterTypes.BY_YEAR) {
      dispatch(
        setGlobalFilter({
          type: newType,
          values: { ...currentValues, year: newYear },
        }),
      );
    } else if (newType === filterTypes.BY_MONTH) {
      dispatch(
        setGlobalFilter({
          type: newType,
          values: { ...currentValues, month: newMonth, year: newYear },
        }),
      );
    } else {
      dispatch(
        setGlobalFilter({
          type: newType,
          values: { year: newYear, month: newMonth },
        }),
      );
    }
  };

  const handleYearChange = (newYear) => {
    setYear(Number(newYear));
    dispatch(
      setGlobalFilter({
        type: currentFilter.type,
        values: { ...currentFilter.values, year: newYear },
      }),
    );
  };
  const handleMonthChange = (newMonth) => {
    setMonth(Number(newMonth));
    dispatch(
      setGlobalFilter({
        type: filterTypes.BY_MONTH,
        values: { ...currentFilter.values, month: newMonth, year: year },
      }),
    );
  };

  return {
    currentFilter,
    filterTypes,
    FilterMonth,
    FilterYear,
    dispatch,
    handleFilterChange,
    handleYearChange,
    handleMonthChange,
    MonthList,
    YearsList,
    year,
    month,
  };
};
