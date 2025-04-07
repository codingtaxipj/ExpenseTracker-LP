import NavMenu from "../components/Navigation/NavMenu";
import { navVars } from "../global/global-variables";

import AllCategories from "../components/all-categories/AllCategories";

const CategoriesAndIcons = () => {
  return (
    <>
      <NavMenu activeBtn={navVars.ALL_CATEGORIES}>
        <AllCategories></AllCategories>
      </NavMenu>
    </>
  );
};

export default CategoriesAndIcons;
