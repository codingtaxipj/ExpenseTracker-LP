import { Icons } from "./icons";
const SectionHeader = ({ title, isAnalysis, isExpense, isIncome }) => {
  return (
    <>
      <div className="text-18 flex flex-row items-center pb-5">
        <Icons.window />
        <span className="min-w-fit pr-5 pl-2.5 font-medium"> {title}</span>

        <span className="h-[0.5px] w-full rounded-full bg-[#454545]"></span>
        <span className="pl-5">
          {isAnalysis && <Icons.analysis />}
          {isExpense && <Icons.expense />}
          {isIncome && <Icons.income />}
        </span>
      </div>
    </>
  );
};

export default SectionHeader;
