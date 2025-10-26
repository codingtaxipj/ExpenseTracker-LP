import moment from "moment";

export const CurrentYear = () => moment().year();
export const CurrentMonth = () => moment().month();
export const DateToday = () => moment();
export const getDate = (d, f = "DD/MM/YY") => {
  if (d) return moment(d).format(f);
  else return moment().format(f);
};
export const getMonthName = (m, f = "MMM") => moment().month(m).format(f);
