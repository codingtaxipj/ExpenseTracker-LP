import moment from "moment";

export const sortByYear = (entries, year) => {
  const thisEntries = entries.filter(
    (items) => moment(items.entryDate).year() === year,
  );
  const stack = [];
  for (let i = 0; i <= 11; i++) {
    const total = thisEntries
      .filter((items) => moment(items.entryDate).month() === i)
      .reduce((sum, items) => sum + items.amount, 0);
    stack.push({
      Title: moment().month(i).format("MMMM"),
      Amount: total,
    });
  }
  return stack;
};

export const sortByMonth = (entries, month, filterBy = "week") => {
  const thisEntries = entries.filter(
    (items) => moment(items.entryDate).month() === month,
  );
  const monthDate = [];
  const stack = [];
  const startBy = moment().month(month).startOf("month");
  const endBy = moment().month(month).endOf("month");

  monthDate.startWeek = startBy.week();
  monthDate.endWeek = endBy.week();

  if (filterBy === "week") {
    monthDate.startDay = startBy.date();
    monthDate.endDay = endBy.date();
    for (let i = monthDate.startWeek; i <= monthDate.endWeek; i++) {
      const total = thisEntries
        .filter((items) => moment(items.entryDate).week() === i)
        .reduce((sum, items) => sum + items.amount, 0);
      stack.push({
        Title: moment().day(i).format("DD"),
        Amount: total,
      });
    }
  }

  return stack;
};
