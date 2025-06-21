import { MdCalculate } from "react-icons/md";
import { FaCalendar, FaCalendarCheck, FaCalculator } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";

import { IoFilter } from "react-icons/io5";

import { ImParagraphLeft } from "react-icons/im";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaIndianRupeeSign,
  FaRegWindowMaximize,
} from "react-icons/fa6";

export const Icons = {
  analysis: MdCalculate,
  window: FaRegWindowMaximize,
  yearCal: FaCalendar,
  monthCal: FaCalendarCheck,
  upbar: BsBarChartFill,
  rupee: FaIndianRupeeSign,
  filter: IoFilter,
  calc: FaCalculator,
  textline: ImParagraphLeft,
  graphup: FaArrowTrendDown,
  graphdown: FaArrowTrendUp,
  expense: GiPayMoney,
  income: GiReceiveMoney,
};
