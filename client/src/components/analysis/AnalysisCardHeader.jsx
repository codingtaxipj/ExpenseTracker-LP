import TotalCard from "./TotalCard";

const AnalysisCardHeader = () => {
  return (
    <>
      <div className="flex flex-row gap-5 px-10 pt-10 pb-25">
        <TotalCard
          isExpense
          color="text-exptxt"
          headText="Expense"
          total={2025}
          footerText={"Your Total Spending in Year"}
          date={2025}
        ></TotalCard>
        <TotalCard
          isExpense
          color="text-exptxt"
          headText="Expense"
          total={2025}
          footerText={"Your Total Spending in Month"}
          date={"June/25"}
        ></TotalCard>
        <TotalCard
          isExpense
          total={2025}
          color="text-exptxt"
          headText="Avg Yearly Expense"
          footerText={"Your Avg Spending in a Year"}
          date={2025}
        ></TotalCard>
        <TotalCard
          isExpense
          total={2025}
          color="text-exptxt"
          headText="Avg Monthly Expense"
          footerText={"Your Avg Spending in a Month"}
          date={2025}
        ></TotalCard>
      </div>
    </>
  );
};

export default AnalysisCardHeader;
