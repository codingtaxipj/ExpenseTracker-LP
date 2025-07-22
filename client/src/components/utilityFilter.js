import moment from "moment";
import numeral from "numeral";

export const filterByExpense = (list) =>
  list.filter((items) => items.isTransactionExpense === true);
export const filterByIncome = (list) =>
  list.filter((items) => items.isTransactionExpense === false);

export const sortByDateOldest = (list) =>
  list.sort((prev, next) => moment(prev.onDate) - moment(next.onDate));

export const sortByDateNewest = (list) =>
  list.sort((prev, next) => moment(next.onDate) - moment(prev.onDate));

export const amountFloat = (amount) => numeral(amount).format("00,00.0");
export const amountInteger = (amount) => numeral(amount).format("00,00");
export const percentSigned = (amount) => numeral(amount).format("+00.00");
