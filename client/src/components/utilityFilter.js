import moment from "moment";

export const filterByExpense = (list) =>
  list.filter((items) => items.isFormExpense === true);
export const filterByIncome = (list) =>
  list.filter((items) => items.isFormExpense === false);

export const sortByDateOldest = (list) =>
  list.sort((prev, next) => moment(prev.entryDate) - moment(next.entryDate));

export const sortByDateNewest = (list) =>
  list.sort((prev, next) => moment(next.entryDate) - moment(prev.entryDate));
