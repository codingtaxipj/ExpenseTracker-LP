import NavMenu from "../components/Navigation/NavMenu";
import { navVars } from "../global/global-variables";
const Income = () => {
  return (
    <>
      <NavMenu activeBtn={navVars.INCOME}> INCOME</NavMenu>
    </>
  );
};

export default Income;
