import useBudgetConfig from "@/hooks/useBudgetConfig";
import TotalCard from "./TotalCard";

const TotalBudgetCard = ({ year }) => {
  const { BudgetByMonth, getTotalBudgetOfYear } = useBudgetConfig();

  //NOTE - gets the total budget of year
  const TotalBudgetYear = getTotalBudgetOfYear(BudgetByMonth, year);

  return (
    <>
      <TotalCard
        color="text-budget"
        headText="Year Budget"
        total={TotalBudgetYear}
        footerText={`Budget of ${year}`}
        date={year}
      ></TotalCard>
    </>
  );
};

export default TotalBudgetCard;
