import moment from "moment";
import HorizontalDivider from "./strips/horizontal-divider";
import { Icons } from "./icons";

const MonthCalander = ({ isExpense, list }) => {
  const currentMonth = moment().month(); // current month index (0-11)
  const currentYear = moment().year();

  // Days of week (change "ddd" to "dddd" if you want full name)
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    moment().weekday(i).format("ddd"),
  );

  // Get first day of month & total days
  const firstDayOfMonth = moment([currentYear, currentMonth, 1]).day();
  const daysInMonthCount = moment([currentYear, currentMonth]).daysInMonth();

  // Fill calendar slots
  const daysInMonth = [
    ...Array(firstDayOfMonth).fill(null), // empty slots before start
    ...Array.from({ length: daysInMonthCount }, (_, i) => i + 1),
  ];

  return (
    <div className="!text-14px w-max font-medium">
      <div className="mb-2 flex items-center rounded-md px-2">
        <Icons.checkCircle
          className={`mr-1.5 ${isExpense ? "text-exp" : "text-inc"}`}
        />
        {moment().format("MMMM, YYYY")} <HorizontalDivider />{" "}
        {isExpense ? "Expense Dates" : "Income Dates"}
      </div>
      {/* Days Header */}
      <div className="from-gradBot to-gradTop shadow-shadowBlack border-br1 mb-2 grid grid-cols-7 rounded-md border bg-gradient-to-t px-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-1.5 text-center text-white">
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7">
        {daysInMonth.map((day, idx) => {
          const hasTransaction =
            day &&
            list.some(
              (exp) =>
                moment(exp.onDate).date() === day &&
                moment(exp.onDate).month() === currentMonth &&
                moment(exp.onDate).year() === currentYear,
            );

          return (
            <div
              key={idx}
              className="border-br1 relative flex cursor-pointer flex-col items-center justify-center py-1.5 text-white"
            >
              {day ? (
                <>
                  <div
                    className={`mb-1 h-1.5 w-1.5 rounded-full ${
                      hasTransaction
                        ? isExpense
                          ? "bg-exp"
                          : "bg-inc"
                        : "bg-transparent"
                    }`}
                  ></div>
                  {day}
                </>
              ) : (
                <span className="opacity-0">•</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthCalander;
