import TableSection from "@/components/TableSection";
import Flexcol from "@/components/section/flexcol";
import SectionTitle from "@/components/section/section-title";
import useTransactionConfig from "@/hooks/useTransactionConfig";

const IncomeIndex = () => {
  const { IncomeList } = useTransactionConfig();

  return (
    <>
      <Flexcol className="pt-20">
        <SectionTitle title="Income List" isIncome />
        <TableSection entries={IncomeList ?? []} />
      </Flexcol>
    </>
  );
};

export default IncomeIndex;
