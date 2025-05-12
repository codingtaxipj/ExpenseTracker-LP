import moment from "moment";

export const sortByYearAsMonths = (entries, year) => {
  const list = entries.filter(
    (items) => moment(items.entryDate).year() === year,
  );
  const stack = [];
  for (let i = 0; i <= 11; i++) {
    const total = list
      .filter((items) => moment(items.entryDate).month() === i)
      .reduce((sum, items) => sum + items.amount, 0);
    stack.push({
      Title: moment().month(i).format("MMMM"),
      Amount: total,
    });
  }
  return stack;
};

export const sortByMonthAsWeeks = (entries, month) => {
  const list = entries.filter(
    (items) => moment(items.entryDate).month() === month,
  );

  const stack = [];
  const startBy = moment().month(month).startOf("month").week();
  const endBy = moment().month(month).endOf("month").week();

  for (let i = startBy; i <= endBy; i++) {
    const total = list
      .filter((items) => moment(items.entryDate).week() === i)
      .reduce((sum, items) => sum + items.amount, 0);
    stack.push({
      Title: moment().week(i).format("wo") + " Week",
      Amount: total,
    });
  }

  return stack;
};

export const sortByMonthAsDates = (entries, month) => {
  const list = entries.filter(
    (items) => moment(items.entryDate).month() === month,
  );

  const stack = [];
  const startBy = moment().month(month).startOf("month").date();
  const endBy = moment().month(month).endOf("month").date();

  for (let i = startBy; i <= endBy; i++) {
    const total = list
      .filter((items) => moment(items.entryDate).date() === i)
      .reduce((sum, items) => sum + items.amount, 0);
    stack.push({
      Title: moment().date(i).format("DD"),
      Amount: total,
    });
  }

  return stack;
};

export const sortByWeekAsDates = (entries, week) => {
  const list = entries.filter(
    (items) => moment(items.entryDate).week() === week,
  );
  const stack = [];
  const startBy = moment().week(week).startOf("week").date();
  const endBy = moment().week(week).endOf("week").date();
  for (let i = startBy; i <= endBy; i++) {
    const total = list
      .filter((items) => moment(items.entryDate).date() === i)
      .reduce((sum, items) => sum + items.amount, 0);
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
