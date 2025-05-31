import moment from "moment";

export const getUniqueYears = (lists) => [
  ...new Set(lists.map((items) => moment(items.entryDate).year())),
];
export const getUniqueMonths = (lists) => [
  ...new Set(lists.map((items) => moment(items.entryDate).month())),
];
export const getUniqueWeeks = (lists) => [
  ...new Set(lists.map((items) => moment(items.entryDate).week())),
];
