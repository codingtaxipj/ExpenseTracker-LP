import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import AnalysisByYear from "./AnalysisByYear";

const IncomeAnalysis = () => {
  return (
    <div>
      <NavMenu activeBtn={PATH.incomeAnalysis}>
        <AnalysisByYear></AnalysisByYear>
      </NavMenu>
    </div>
  );
};

export default IncomeAnalysis;
