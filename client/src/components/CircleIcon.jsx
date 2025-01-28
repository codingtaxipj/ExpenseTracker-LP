import PropTypes from "prop-types";
import IconsUsed from "./IconsUsed";
import category from "../assets/lib/icondata.json";
const CircleIcon = ({ iconName, iconColor }) => {
  /**
    * 
    **if we want to use states
    useEffect(() => {
    // Update iconData when iconName changes
    switch (iconName) {
      case "a":
        setIconData({
          color: "text-[white] bg-[black]",
          name: ["fa", "receipt"],
        });
        break;
      default:
        setIconData({
          color: "text-[gray] bg-[lightgray]",
          name: ["fa", "circle"],
        });
        break;
    }
  }, [iconName]); //Dependency array ensures this runs only when iconName changes
    */

  const iconData = (() => {
    switch (iconColor) {
      case category.utlities.thisCategoryTitle:
        return { Color: "text-[white] bg-util" };
      //*Transportation ICONS
      case category.travel.thisCategoryTitle:
        return { Color: "text-[white] bg-travel" };
      //* Food and Drinmk ICONS
      case category.food.thisCategoryTitle:
        return { Color: "text-[white] bg-food" };
      //*shopping ICONS
      case category.shop.thisCategoryTitle:
        return { Color: "text-[white] bg-shop" };
      //*Medical ICONS
      case category.health.thisCategoryTitle:
        return { Color: "text-[white] bg-health" };
      //*insurance ICON
      case category.insurance.thisCategoryTitle:
        return { Color: "text-[white] bg-insurance" };
      //*loan and debt ICONS
      case category.loan.thisCategoryTitle:
        return { Color: "text-[white] bg-loan" };
      //*Education ICONS
      case category.edu.thisCategoryTitle:
        return { Color: "text-[white] bg-edu" };
      //*gifting ICONS
      case category.gift.thisCategoryTitle:
        return { Color: "text-[white] bg-gift" };
      //* Entertainment ICONS
      case category.ent.thisCategoryTitle:
        return { Color: "text-[white] bg-ent" };
      //*Personal ICONS
      case category.personal.thisCategoryTitle:
        return { Color: "text-[white] bg-personal" };
      //*Tax ICONS
      case category.tax.tax:
        return { Color: "text-[white] bg-tax" };
      //*Miscellaneous
      case category.misc.misc:
        return { Color: "text-[white] bg-misc" };
    }
  })();

  // ? above empty () IIFE logic : execute logic immediately and assign the result to a variable.

  let iconStyle =
    "p-4 flex items-center justify-center rounded-full text-[32px]" +
    " " +
    iconData?.Color;

  return (
    <>
      <div className={iconStyle}>
        <IconsUsed icon={iconName} />
      </div>
    </>
  );
};

export default CircleIcon;
CircleIcon.propTypes = {
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
};
