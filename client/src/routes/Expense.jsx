import NavMenu from "../components/Navigation/NavMenu";
import { navVars } from "../global/global-variables";
const Expense = () => {
  return (
    <>
      <NavMenu activeBtn={navVars.EXPENSE}> EXPENSE</NavMenu>
    </>
  );
};

export default Expense;
