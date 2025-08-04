import SingleYearGraph from "@/components/analysis/Single-Year-Graph";
import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";

const IncomeAnalysis = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.incomeAnalysis}>
        <SingleYearGraph></SingleYearGraph>
      </NavMenu>
    </>
  );
};

export default IncomeAnalysis;
