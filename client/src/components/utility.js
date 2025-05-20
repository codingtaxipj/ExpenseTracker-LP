import moment from "moment";
export const Graph = {
  byYear: "year",
  byMonth: {
    asWeek: "monthAsWeeks",
    asDate: "monthAsDates",
  },
  byWeek: "week",
  inMonth: {
    asWeek: "monthInWeeks",
    asDate: "monthInDates",
  },
};

export const getYearOfDate = date => moment(date).year();
export const getMonthOfDate = date => moment(date).month();
export const getWeekOfDate = date => moment(date).week();
export const getDateOfDate = date => moment(date).date();

export const getEntriesOfYear = (entries, year) =>
  entries.filter(items => moment(items.entryDate).year() === year);
export const getEntriesOfMonth = (entries, date) =>
  entries.filter(items => moment(items.entryDate).month() === date);
export const getEntriesOfWeek = (entries, date) =>
  entries.filter(items => moment(items.entryDate).week() === date);

export const getEntryDatesData = entries => {
  // First Entry
  const FY = getYearOfDate(entries[0].entryDate);
  const FM = getMonthOfDate(entries[0].entryDate);
  const FW = getWeekOfDate(entries[0].entryDate);
  const FD = getDateOfDate(entries[0].entryDate);

  // Last Entry
  const LY = getYearOfDate(entries[entries.length - 1].entryDate);
  const LM = getMonthOfDate(entries[entries.length - 1].entryDate);
  const LW = getWeekOfDate(entries[entries.length - 1].entryDate);
  const LD = getDateOfDate(entries[entries.length - 1].entryDate);

  return {
    year: { start: FY, end: LY },
    month: { start: FM, end: LM },
    week: { start: FW, end: LW },
    date: { start: FD, end: LD },
  };
};

export const getYearObjArray = (start, end) => {
  const years = Array.from({ length: end - start + 1 }, (_, i) => ({
    value: start + i,
    title: start + i,
  }));
  return years;
};

export const getMonthObjArray = (start, end) => {
  const months = Array.from({ length: end - start + 1 }, (_, i) => ({
    value: start + i,
    title: moment().month(start).format("MMMM"),
  }));

  return months;
};

export const getWeekObjArray = (start, end) => {
  const months = Array.from({ length: end - start + 1 }, (_, i) => ({
    value: start + i,
    title: moment().week(start).format("wo") + " Week",
  }));

  return months;
};

export const sortByYearAsMonths = entries => {
  const stack = [];
  for (let i = 0; i <= 11; i++) {
    const total = entries
      .filter(items => moment(items.entryDate).month() === i)
      .reduce((sum, items) => sum + items.amount, 0);
    stack.push({
      Title: moment().month(i).format("MMM"),
      Amount: total,
    });
  }
  return stack;
};

export const sortByMonthAsWeeks = (entries, month) => {
  const MonthList = getEntriesOfMonth(entries, month);

  const stack = [];
  const startBy = moment().month(month).startOf("month").week();
  const endBy = moment().month(month).endOf("month").week();

  for (let i = startBy; i <= endBy; i++) {
    const total = MonthList.filter(
      items => moment(items.entryDate).week() === i
    ).reduce((sum, items) => sum + items.amount, 0);
    stack.push({
      Title: moment().week(i).format("wo") + " Week",
      Amount: total,
    });
  }

  return stack;
};

export const sortByMonthAsDates = (entries, month) => {
  const MonthList = getEntriesOfMonth(entries, month);

  const stack = [];
  const startBy = moment().month(month).startOf("month").date();
  const endBy = moment().month(month).endOf("month").date();

  for (let i = startBy; i <= endBy; i++) {
    const total = MonthList.filter(
      items => moment(items.entryDate).date() === i
    ).reduce((sum, items) => sum + items.amount, 0);
    stack.push({
      Title: moment().date(i).format("DD"),
      Amount: total,
    });
  }

  return stack;
};

export const sortByWeekAsDates = (entries, week) => {
  const WeekList = getEntriesOfWeek(entries, week);

  const stack = [];
  const startBy = moment().week(week).startOf("week").date();
  const endBy = moment().week(week).endOf("week").date();
  for (let i = startBy; i <= endBy; i++) {
    const total = WeekList.filter(
      items => moment(items.entryDate).date() === i
    ).reduce((sum, items) => sum + items.amount, 0);
    stack.push({
      Title:
        moment().date(i).format("Do") +
        " " +
        moment().week(week).startOf("week").format("MMM"),
      Amount: total,
    });
  }
  return stack;
};
