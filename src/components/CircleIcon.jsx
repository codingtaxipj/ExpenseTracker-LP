import PropTypes from "prop-types";
import IconsUsed from "./IconsUsed";
import category from "../assets/lib/icondata.json";
const CircleIcon = ({ iconName }) => {
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
    switch (iconName) {
      case category.utlities.electricity:
      case category.utlities.gas:
      case category.utlities.internet:
      case category.utlities.mobile:
      case category.utlities.tv:
      case category.utlities.water:
      case category.utlities.cc:
      case category.utlities.repair:
      case category.utlities.rent:
        return { Color: "text-[white] bg-util" };
      //*Transportation ICONS
      case category.travel.fuel:
      case category.travel.parking:
      case category.travel.taxi:
      case category.travel.train:
      case category.travel.bus:
      case category.travel.aeroplan:
      case category.travel.toll:
        return { Color: "text-[white] bg-travel" };
      //* Food and Drinmk ICONS
      case category.food.groceries:
      case category.food.rest:
      case category.food.cafe:
      case category.food.order:
      case category.food.snack:
      case category.food.drink:
      case category.food.pet:
        return { Color: "text-[white] bg-food" };
      //*shopping ICONS
      case category.shop.cloth:
      case category.shop.gadget:
      case category.shop.appliance:
      case category.shop.furni:
      case category.shop.foot:
      case category.shop.acc:
      case category.shop.tool:
      case category.shop.cleaning:
      case category.shop.toilet:
        return { Color: "text-[white] bg-shop" };
      //*Medical ICONS
      case category.health.visit:
      case category.health.meds:
      case category.health.checkup:
      case category.health.vaccni:
      case category.health.operation:
        return { Color: "text-[white] bg-health" };
      //*insurance ICON
      case category.insurance.insurance:
        return { Color: "text-[white] bg-insurance" };
      //*loan and debt ICONS
      case category.loan.bank:
      case category.loan.mortage:
      case category.loan.debttaken:
      case category.loan.debtgiven:
      case category.loan.emi:
      case category.loan.default:
        return { Color: "text-[white] bg-loan" };
      //*Education ICONS
      case category.edu.school:
      case category.edu.college:
      case category.edu.course:
      case category.edu.coaching:
      case category.edu.online:
      case category.edu.supplies:
        return { Color: "text-[white] bg-edu" };
      //*gifting ICONS
      case category.gift.bday:
      case category.gift.wed:
      case category.gift.anna:
      case category.gift.festiv:
      case category.gift.special:
      case category.gift.gen:
      case category.gift.donation:
        return { Color: "text-[white] bg-gift" };
      //* Entertainment ICONS
      case category.ent.movie:
      case category.ent.games:
      case category.ent.event:
      case category.ent.hotel:
      case category.ent.sub:
      case category.ent.park:
      case category.ent.hobbie:
        return { Color: "text-[white] bg-ent" };
      //*Personal ICONS
      case category.personal.salon:
      case category.personal.gym:
      case category.personal.cos:
      case category.personal.eqp:
      case category.personal.yoga:
      case category.personal.wellness:
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
};
