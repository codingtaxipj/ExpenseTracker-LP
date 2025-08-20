import moment from "moment";

export const CurrentYear = () => moment().year();
export const CurrentMonth = () => moment().month();
export const DateToday = () => moment();
export const getDate = (d, f = "DD/MM/YY") => moment(d).local().format(f);
export const getMonthName = (m, f = "MMM") => moment().month(m).format(f);
