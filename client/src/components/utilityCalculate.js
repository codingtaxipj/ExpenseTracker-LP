import moment from "moment";

export const getUniqueYears = (lists) => [
  ...new Set(lists.map((items) => moment(items.onDate).year())),
];
export const getUniqueMonths = (lists) => [
  ...new Set(lists.map((items) => moment(items.onDate).month())),
];
export const getUniqueWeeks = (lists) => [
  ...new Set(lists.map((items) => moment(items.onDate).week())),
];
