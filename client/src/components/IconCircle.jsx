import IconAvatar from "./IconAvatar";
import { expenseCategories } from "@/global/icon-data";
import { incomeCategories } from "@/global/icon-data";

const IconCircle = ({ setIcon, bgColor }) => {
  const color = () => {
    switch (bgColor) {
      case expenseCategories.utlities.thisCategoryTitle:
        return "bg-util";
      case expenseCategories.travel.thisCategoryTitle:
        return "bg-travel";
      case expenseCategories.food.thisCategoryTitle:
        return "bg-food";
      case expenseCategories.shop.thisCategoryTitle:
        return "bg-shop";
      case expenseCategories.health.thisCategoryTitle:
        return "bg-health";
      case expenseCategories.loan.thisCategoryTitle:
        return "bg-loan";
      case expenseCategories.edu.thisCategoryTitle:
        return "bg-edu";
      case expenseCategories.gift.thisCategoryTitle:
        return "bg-gift";
      case expenseCategories.ent.thisCategoryTitle:
        return "bg-ent";
      case expenseCategories.personal.thisCategoryTitle:
        return "bg-personal";
      case expenseCategories.tax.thisCategoryTitle:
        return "bg-tax";
      case expenseCategories.insurance.thisCategoryTitle:
        return "bg-insurance";
      case expenseCategories.misc.thisCategoryTitle:
        return "bg-misc";
      case incomeCategories.income.thisCategoryTitle:
        return "bg-inc";
    }
  };
  const style = `flex w-fit items-center justify-center rounded-full p-2 text-[20px] text-white ${color()}`;
  return (
    <>
      <div className={style}>
        <IconAvatar icon={setIcon} />
      </div>
    </>
  );
};

export default IconCircle;
