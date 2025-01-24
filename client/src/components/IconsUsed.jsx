import PropTypes from "prop-types";
import category from "../assets/lib/icondata.json";
import { BsBank2, BsFillFuelPumpFill } from "react-icons/bs";
import {
  FaBirthdayCake,
  FaBook,
  FaBus,
  FaCalendarCheck,
  FaCalendarDay,
  FaCalendarTimes,
  FaChalkboardTeacher,
  FaCreditCard,
  FaDumbbell,
  FaFileMedicalAlt,
  FaGift,
  FaHandHoldingMedical,
  FaHotel,
  FaLightbulb,
  FaMapMarkedAlt,
  FaMobileAlt,
  FaParking,
  FaPencilRuler,
  FaPlane,
  FaRoad,
  FaSatelliteDish,
  FaSchool,
  FaShapes,
  FaSimCard,
  FaTaxi,
  FaToiletPaper,
  FaTools,
  FaTrain,
  FaUser,
  FaWifi,
} from "react-icons/fa";
import {
  GiClothes,
  GiConverseShoe,
  GiGasStove,
  GiPayMoney,
  GiReceiveMoney,
  GiTakeMyMoney,
  GiWeightLiftingUp,
} from "react-icons/gi";
import {
  IoCafe,
  IoDocumentText,
  IoFastFood,
  IoGameController,
  IoWater,
} from "react-icons/io5";
import {
  MdCastForEducation,
  MdChair,
  MdDeliveryDining,
  MdLocalGroceryStore,
  MdLocalMovies,
  MdMedication,
  MdMicrowave,
  MdOutlinePets,
} from "react-icons/md";
import { SiJusteat } from "react-icons/si";
import { RiDrinksFill } from "react-icons/ri";
import { TbSunglassesFilled, TbVaccine } from "react-icons/tb";
import { AiFillGold, AiFillTool } from "react-icons/ai";
import { BiSolidCalendarStar, BiSolidWasher } from "react-icons/bi";
import { FaScissors, FaUserDoctor } from "react-icons/fa6";
import { IoIosSchool, IoIosTv, IoMdMedical } from "react-icons/io";
import { HiPaintBrush } from "react-icons/hi2";
import { GrYoga } from "react-icons/gr";
const IconsUsed = ({ icon }) => {
  switch (icon) {
    //*Utilities ICONS
    case category.utlities.electricity:
      return <FaLightbulb />;
    case category.utlities.water:
      return <IoWater />;
    case category.utlities.mobile:
      return <FaSimCard />;
    case category.utlities.internet:
      return <FaWifi />;
    case category.utlities.tv:
      return <FaSatelliteDish />;
    case category.utlities.gas:
      return <GiGasStove />;
    case category.utlities.cc:
      return <FaCreditCard />;
    case category.utlities.repair:
      return <FaTools />;
    case category.utlities.rent:
      return <GiTakeMyMoney />;
    //*Transportation ICONS
    case category.travel.fuel:
      return <BsFillFuelPumpFill />;
    case category.travel.parking:
      return <FaParking />;
    case category.travel.taxi:
      return <FaTaxi />;
    case category.travel.train:
      return <FaTrain />;
    case category.travel.bus:
      return <FaBus />;
    case category.travel.aeroplan:
      return <FaPlane />;
    case category.travel.toll:
      return <FaRoad />;

    //* Food and Drinmk ICONS
    case category.food.groceries:
      return <MdLocalGroceryStore />;
    case category.food.rest:
      return <SiJusteat />;
    case category.food.cafe:
      return <IoCafe />;
    case category.food.order:
      return <MdDeliveryDining />;
    case category.food.snack:
      return <IoFastFood />;
    case category.food.drink:
      return <RiDrinksFill />;
    case category.food.pet:
      return <MdOutlinePets />;

    //*shopping ICONS
    case category.shop.cloth:
      return <GiClothes />;
    case category.shop.gadget:
      return <FaMobileAlt />;
    case category.shop.appliance:
      return <MdMicrowave />;
    case category.shop.furni:
      return <MdChair />;
    case category.shop.foot:
      return <GiConverseShoe />;
    case category.shop.acc:
      return <TbSunglassesFilled />;
    case category.shop.tool:
      return <AiFillTool />;
    case category.shop.cleaning:
      return <BiSolidWasher />;
    case category.shop.toilet:
      return <FaToiletPaper />;
    //*Medical ICONS
    case category.health.visit:
      return <FaUserDoctor />;
    case category.health.meds:
      return <MdMedication />;
    case category.health.checkup:
      return <FaFileMedicalAlt />;
    case category.health.vaccni:
      return <TbVaccine />;
    case category.health.operation:
      return <FaHandHoldingMedical />;
    //*insurance ICON

    case category.insurance.insurance:
      return <IoDocumentText />;
    //*loan and debt ICONS
    case category.loan.bank:
      return <BsBank2 />;
    case category.loan.mortage:
      return <AiFillGold />;
    case category.loan.debttaken:
      return <GiReceiveMoney />;
    case category.loan.debtgiven:
      return <GiPayMoney />;
    case category.loan.emi:
      return <FaCalendarCheck />;
    case category.loan.default:
      return <FaCalendarTimes />;
    //*Education ICONS
    case category.edu.school:
      return <FaSchool />;
    case category.edu.college:
      return <IoIosSchool />;
    case category.edu.course:
      return <FaBook />;
    case category.edu.coaching:
      return <FaChalkboardTeacher />;
    case category.edu.online:
      return <MdCastForEducation />;
    case category.edu.supplies:
      return <FaPencilRuler />;
    //*gifting ICONS
    case category.gift.bday:
      return <FaBirthdayCake />;
    case category.gift.wed:
      return <FaCalendarDay />;
    case category.gift.anna:
      return <FaBirthdayCake />;
    case category.gift.festiv:
      return <FaCalendarDay />;
    case category.gift.special:
      return <BiSolidCalendarStar />;
    case category.gift.gen:
      return <FaGift />;
    case category.gift.donation:
      return <GiPayMoney />;

    //* Entertainment ICONS
    case category.ent.movie:
      return <MdLocalMovies />;
    case category.ent.games:
      return <IoGameController />;
    case category.ent.event:
      return <FaCalendarDay />;
    case category.ent.hotel:
      return <FaHotel />;
    case category.ent.sub:
      return <IoIosTv />;
    case category.ent.park:
      return <FaMapMarkedAlt />;
    case category.ent.hobbie:
      return <HiPaintBrush />;
    //*Personal ICONS
    case category.personal.salon:
      return <FaScissors />;
    case category.personal.gym:
      return <GiWeightLiftingUp />;
    case category.personal.cos:
      return <FaUser />;
    case category.personal.eqp:
      return <FaDumbbell />;
    case category.personal.yoga:
      return <GrYoga />;
    case category.personal.wellness:
      return <IoMdMedical />;
    //*Tax ICONS
    case category.tax.tax:
      return <BsBank2 />;
    //*Miscellaneous
    case category.misc.misc:
      return <FaShapes />;
  }
};
IconsUsed.propTypes = {
  icon: PropTypes.string,
};

export default IconsUsed;
