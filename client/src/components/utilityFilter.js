import moment from "moment";
import numeral from "numeral";

export const filterByExpense = (list) =>
  list.filter((items) => items.isFormExpense === true);
export const filterByIncome = (list) =>
  list.filter((items) => items.isFormExpense === false);

export const sortByDateOldest = (list) =>
  list.sort((prev, next) => moment(prev.entryDate) - moment(next.entryDate));

export const sortByDateNewest = (list) =>
  list.sort((prev, next) => moment(next.entryDate) - moment(prev.entryDate));

export const amountFloat = (amount) => numeral(amount).format("00,00.0");
export const amountInteger = (amount) => numeral(amount).format("00,00");
export const percentSigned = (amount) => numeral(amount).format("+00");
