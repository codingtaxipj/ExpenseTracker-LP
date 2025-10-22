import moment from "moment";
import ExpButton from "../buttons/exp-button";
import { FaCalendarDay, FaClock, FaPowerOff } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { IoMdSettings } from "react-icons/io";
import SelectFilter from "../selectFilter/SelectFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTypes,
  selectCurrentFilter,
  setGlobalFilter,
} from "@/redux/slices/filter-slice";
import useTotalConfig from "@/hooks/useTotalConfig";
import { useFilterConfig } from "@/hooks/useFilterConfig";

const style = "!text-12px w-max  space-x-0.75 p-1";

export const ActiveDate = () => {
  const currentDate = moment().format("DD MMMM, YYYY");
  return (
    <ExpButton custom_textbtn className={cn(style, "cursor-default")}>
      <FaCalendarDay />
      <span>{currentDate}</span>
    </ExpButton>
  );
};

export const ActiveClock = () => {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ExpButton custom_textbtn className={cn(style, "cursor-default")}>
      <FaClock />
      <span> {time.format("hh:mm A")}</span>
    </ExpButton>
  );
};

export const PageTitle = ({ nav, activeBtn }) => {
  return (
    <ExpButton custom_textbtn className={cn(style, "cursor-default")}>
      <Icons.window />
      {nav.find((n) => n.link === activeBtn)?.name}
    </ExpButton>
  );
};

export const UserLogout = () => {
  return (
    <ExpButton custom_textbtn className={style}>
      <FaPowerOff />
      Logout
    </ExpButton>
  );
};

export const UserSettings = () => {
  return (
    <ExpButton custom_textbtn className={style}>
      <IoMdSettings />
      Settings
    </ExpButton>
  );
};

export const GlobalFilter = () => {
  const { YearsList } = useTotalConfig();
  const { currentFilter, dispatch } = useFilterConfig();
  const MonthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const defaultYear = Number(currentFilter.values.year) || moment().year();
  const defaultMonth = Number(currentFilter.values.month) || moment().month();

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
      setMonth(defaultMonth);
      setYear(defaultYear);

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
  return (
    <>
      <SelectFilter
        className={"min-w-35"}
        onValueChange={handleFilterChange}
        value={currentFilter.type}
        list={Object.values(filterTypes)}
      />
      {(currentFilter.type === filterTypes.BY_YEAR ||
        currentFilter.type === filterTypes.BY_MONTH) && (
        <>
          <SelectFilter
            className={"min-w-20"}
            onValueChange={handleYearChange}
            value={year}
            list={YearsList}
          />
          {currentFilter.type === filterTypes.BY_MONTH && (
            <SelectFilter
              isMonth
              className={"min-w-20"}
              onValueChange={handleMonthChange}
              value={month}
              list={MonthList}
            />
          )}
        </>
      )}
    </>
  );
};
