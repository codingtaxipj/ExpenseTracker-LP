import { expenseCategories } from "@/global/icon-data";
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
  FaMoneyCheckAlt,
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
  GiLaptop,
  GiMoneyStack,
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
  MdSell,
} from "react-icons/md";
import { SiJusteat } from "react-icons/si";
import { RiDrinksFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbSunglassesFilled, TbVaccine } from "react-icons/tb";
import { AiFillGold, AiFillTool } from "react-icons/ai";
import { BiSolidCalendarStar, BiSolidWasher } from "react-icons/bi";
import { FaHouseChimneyUser, FaScissors, FaUserDoctor } from "react-icons/fa6";
import { IoIosSchool, IoIosTv, IoMdMedical } from "react-icons/io";
import { HiPaintBrush } from "react-icons/hi2";
import { GrYoga } from "react-icons/gr";
import { PiClockCountdownFill } from "react-icons/pi";

const IconAvatar = ({ icon }) => {
  switch (icon) {
    //*Income ICONS
    case "Salary":
      return <RiMoneyRupeeCircleFill />;
    case "Salary Bonus":
      return <GiMoneyStack />;
    case "Part-Time Job":
      return <PiClockCountdownFill />;
    case "Freelance Work":
      return <GiLaptop />;
    case "Reselling":
      return <MdSell />;
    case "Rental Income":
      return <FaHouseChimneyUser />;
    case "Service Provided":
      return <FaTools />;
    case "Loan Repaid":
      return <GiPayMoney />;
    case "Prize Money":
      return <FaMoneyCheckAlt />;
    case "Loan Taken":
      return <GiReceiveMoney />;

    //*Utilities ICONS
    case expenseCategories.utlities.electricity:
      return <FaLightbulb />;
    case expenseCategories.utlities.water:
      return <IoWater />;
    case expenseCategories.utlities.mobile:
      return <FaSimCard />;
    case expenseCategories.utlities.internet:
      return <FaWifi />;
    case expenseCategories.utlities.tv:
      return <FaSatelliteDish />;
    case expenseCategories.utlities.gas:
      return <GiGasStove />;
    case expenseCategories.utlities.cc:
      return <FaCreditCard />;
    case expenseCategories.utlities.repair:
      return <FaTools />;
    case expenseCategories.utlities.rent:
      return <GiTakeMyMoney />;
    //*Transportation ICONS
    case expenseCategories.travel.fuel:
      return <BsFillFuelPumpFill />;
    case expenseCategories.travel.parking:
      return <FaParking />;
    case expenseCategories.travel.taxi:
      return <FaTaxi />;
    case expenseCategories.travel.train:
      return <FaTrain />;
    case expenseCategories.travel.bus:
      return <FaBus />;
    case expenseCategories.travel.aeroplan:
      return <FaPlane />;
    case expenseCategories.travel.toll:
      return <FaRoad />;

    //* Food and Drinmk ICONS
    case expenseCategories.food.groceries:
      return <MdLocalGroceryStore />;
    case expenseCategories.food.rest:
      return <SiJusteat />;
    case expenseCategories.food.cafe:
      return <IoCafe />;
    case expenseCategories.food.order:
      return <MdDeliveryDining />;
    case expenseCategories.food.snack:
      return <IoFastFood />;
    case expenseCategories.food.drink:
      return <RiDrinksFill />;
    case expenseCategories.food.pet:
      return <MdOutlinePets />;

    //*shopping ICONS
    case expenseCategories.shop.cloth:
      return <GiClothes />;
    case expenseCategories.shop.gadget:
      return <FaMobileAlt />;
    case expenseCategories.shop.appliance:
      return <MdMicrowave />;
    case expenseCategories.shop.furni:
      return <MdChair />;
    case expenseCategories.shop.foot:
      return <GiConverseShoe />;
    case expenseCategories.shop.acc:
      return <TbSunglassesFilled />;
    case expenseCategories.shop.tool:
      return <AiFillTool />;
    case expenseCategories.shop.cleaning:
      return <BiSolidWasher />;
    case expenseCategories.shop.toilet:
      return <FaToiletPaper />;
    //*Medical ICONS
    case expenseCategories.health.visit:
      return <FaUserDoctor />;
    case expenseCategories.health.meds:
      return <MdMedication />;
    case expenseCategories.health.checkup:
      return <FaFileMedicalAlt />;
    case expenseCategories.health.vaccni:
      return <TbVaccine />;
    case expenseCategories.health.operation:
      return <FaHandHoldingMedical />;
    //*insurance ICON

    case expenseCategories.insurance.insurance:
      return <IoDocumentText />;
    //*loan and debt ICONS
    case expenseCategories.loan.bank:
      return <BsBank2 />;
    case expenseCategories.loan.mortage:
      return <AiFillGold />;
    case expenseCategories.loan.debttaken:
      return <GiReceiveMoney />;
    case expenseCategories.loan.debtgiven:
      return <GiPayMoney />;
    case expenseCategories.loan.emi:
      return <FaCalendarCheck />;
    case expenseCategories.loan.default:
      return <FaCalendarTimes />;
    //*Education ICONS
    case expenseCategories.edu.school:
      return <FaSchool />;
    case expenseCategories.edu.college:
      return <IoIosSchool />;
    case expenseCategories.edu.course:
      return <FaBook />;
    case expenseCategories.edu.coaching:
      return <FaChalkboardTeacher />;
    case expenseCategories.edu.online:
      return <MdCastForEducation />;
    case expenseCategories.edu.supplies:
      return <FaPencilRuler />;
    //*gifting ICONS
    case expenseCategories.gift.bday:
      return <FaBirthdayCake />;
    case expenseCategories.gift.wed:
      return <FaCalendarDay />;
    case expenseCategories.gift.anna:
      return <FaBirthdayCake />;
    case expenseCategories.gift.festiv:
      return <FaCalendarDay />;
    case expenseCategories.gift.special:
      return <BiSolidCalendarStar />;
    case expenseCategories.gift.gen:
      return <FaGift />;
    case expenseCategories.gift.donation:
      return <GiPayMoney />;

    //* Entertainment ICONS
    case expenseCategories.ent.movie:
      return <MdLocalMovies />;
    case expenseCategories.ent.games:
      return <IoGameController />;
    case expenseCategories.ent.event:
      return <FaCalendarDay />;
    case expenseCategories.ent.hotel:
      return <FaHotel />;
    case expenseCategories.ent.sub:
      return <IoIosTv />;
    case expenseCategories.ent.park:
      return <FaMapMarkedAlt />;
    case expenseCategories.ent.hobbie:
      return <HiPaintBrush />;
    //*Personal ICONS
    case expenseCategories.personal.salon:
      return <FaScissors />;
    case expenseCategories.personal.gym:
      return <GiWeightLiftingUp />;
    case expenseCategories.personal.cos:
      return <FaUser />;
    case expenseCategories.personal.eqp:
      return <FaDumbbell />;
    case expenseCategories.personal.yoga:
      return <GrYoga />;
    case expenseCategories.personal.wellness:
      return <IoMdMedical />;
    //*Tax ICONS
    case expenseCategories.tax.tax:
      return <BsBank2 />;
    //*Miscellaneous
    case expenseCategories.misc.misc:
      return <FaShapes />;
  }
};

export default IconAvatar;
