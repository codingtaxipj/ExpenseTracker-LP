import moment from "moment";
import {
  getEntriesOfMonth,
  getEntriesOfWeek,
  getEntriesOfYear,
  getTotalOfEntries,
} from "./utility";

export const getUniqueYears = (lists) => [
  ...new Set(lists.map((items) => moment(items.entryDate).year())),
];
export const getUniqueMonths = (lists) => [
  ...new Set(lists.map((items) => moment(items.entryDate).month())),
];
export const getUniqueWeeks = (lists) => [
  ...new Set(lists.map((items) => moment(items.entryDate).week())),
];

export const getYearTotal = (list, year) => {
  const sortedList = getEntriesOfYear(list, year);
  const total = getTotalOfEntries(sortedList);
  return total;
};

export const getMonthTotal = (list, month) => {
  const sortedList = getEntriesOfMonth(list, month);
  const total = getTotalOfEntries(sortedList);
  return total;
};

export const getWeekTotal = (list, week) => {
  const sortedList = getEntriesOfWeek(list, week);
  const total = getTotalOfEntries(sortedList);
  return total;
};
