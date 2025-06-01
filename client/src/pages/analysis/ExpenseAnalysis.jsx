import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import AnalysisByYear from "./AnalysisByYear";

const ExpenseAnalysis = () => {
  return (
    <div>
      <NavMenu activeBtn={PATH.expenseAnalysis}>
        <AnalysisByYear></AnalysisByYear>
      </NavMenu>
    </div>
  );
};

export default ExpenseAnalysis;
