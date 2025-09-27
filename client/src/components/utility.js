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

export const getYearOfDate = (date) => moment(date).year();
export const getMonthOfDate = (date) => moment(date).month();
export const getWeekOfDate = (date) => moment(date).week();
export const getDateOfDate = (date) => moment(date).date();

export const getTotalOfEntries = (entries) =>
  entries.reduce((sum, items) => sum + items.ofAmount, 0);

export const getEntriesOfYear = (entries, year) =>
  entries.filter((items) => moment(items.onDate).year() === year);
export const getEntriesOfMonth = (entries, date) =>
  entries.filter((items) => moment(items.onDate).month() === date);
export const getEntriesOfWeek = (entries, date) =>
  entries.filter((items) => moment(items.onDate).week() === date);
export const getEntriesOfPrimeCat = (entries, prime) =>
  entries.filter((items) => items.primeCategory === prime);
export const getEntriesOfSubCat = (entries, sub) =>
  entries.filter((items) => items.subCategory === sub);

export const getOldestDate = (entries) =>
  entries.reduce((oldest, current) => {
    return moment(current.onDate).isBefore(moment(oldest.onDate))
      ? current
      : oldest;
  });

export const getNewestDate = (entries) =>
  entries.reduce((newest, current) => {
    return moment(current.onDate).isAfter(moment(newest.onDate))
      ? current
      : newest;
  });

export const getonDatesData = (entries) => {
  const oldestEntry = getOldestDate(entries);
  const newestEntry = getNewestDate(entries);

  // First Entry
  const FY = getYearOfDate(oldestEntry.onDate);
  const FM = getMonthOfDate(oldestEntry.onDate);
  const FW = getWeekOfDate(oldestEntry.onDate);
  const FD = getDateOfDate(oldestEntry.onDate);

  // Last Entry
  const LY = getYearOfDate(newestEntry.onDate);
  const LM = getMonthOfDate(newestEntry.onDate);
  const LW = getWeekOfDate(newestEntry.onDate);
  const LD = getDateOfDate(newestEntry.onDate);

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
    title: moment()
      .month(start + i)
      .format("MMMM"),
  }));

  return months;
};

export const getWeekObjArray = (start, end) => {
  const months = Array.from({ length: end - start + 1 }, (_, i) => ({
    value: start + i,
    title:
      moment()
        .week(start + i)
        .format("wo") + " Week",
  }));

  return months;
};

export const sortByYearAsMonths = (entries) => {
  const stack = [];
  for (let i = 0; i <= 11; i++) {
    const filteredEntries = entries.filter(
      (items) => moment(items.onDate).month() === i,
    );
    const total = getTotalOfEntries(filteredEntries);
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
    const filteredEntries = MonthList.filter(
      (items) => moment(items.onDate).week() === i,
    );
    const total = getTotalOfEntries(filteredEntries);
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
    const filteredEntries = MonthList.filter(
      (items) => moment(items.onDate).date() === i,
    );
    const total = getTotalOfEntries(filteredEntries);
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
    const filteredEntries = WeekList.filter(
      (items) => moment(items.onDate).date() === i,
    );
    const total = getTotalOfEntries(filteredEntries);
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

export const ArrayCheck = (data) => {
  if (!Array.isArray(data) || !data.length) return null;
  else return data;
};
