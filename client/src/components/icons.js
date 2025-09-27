import {
  MdEventRepeat,
  MdCalculate,
  MdDelete,
  MdCancel,
  MdSpaceDashboard,
  MdEditNote,
} from "react-icons/md";
import {
  FaCalendar,
  FaCalendarCheck,
  FaCalculator,
  FaCalendarDay,
  FaCarSide,
  FaEdit,
} from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";

import { IoFilter, IoAddCircle } from "react-icons/io5";

import { ImParagraphLeft } from "react-icons/im";
import { GiPayMoney, GiTakeMyMoney, GiReceiveMoney } from "react-icons/gi";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaIndianRupeeSign,
  FaRegWindowMaximize,
} from "react-icons/fa6";

import {
  BiSolidLabel,
  BiSort,
  BiSortDown,
  BiSortUp,
  BiCheck,
  BiSolidCalendarEdit,
  BiSolidCalendarPlus,
} from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";
import { HiPencil } from "react-icons/hi";
import { TbCancel } from "react-icons/tb";

import { CgAdd } from "react-icons/cg";

import {
  IoIosCheckmarkCircle,
  IoMdEye,
  IoIosArrowForward,
  IoIosArrowBack,
  IoMdAdd,
} from "react-icons/io";

import {
  RiAddFill,
  RiDeleteBin5Fill,
  RiEdit2Fill,
  RiExternalLinkFill,
} from "react-icons/ri";

export const Icons = {
  analysis: MdCalculate,
  window: FaRegWindowMaximize,
  yearCal: FaCalendar,
  monthCal: FaCalendarCheck,
  dayCal: FaCalendarDay,
  upbar: BsBarChartFill,
  rupee: FaIndianRupeeSign,
  filter: IoFilter,
  calc: FaCalculator,
  textline: ImParagraphLeft,
  graphup: FaArrowTrendUp,
  graphdown: FaArrowTrendDown,
  expense: GiPayMoney,
  income: GiReceiveMoney,
  formlabel: BiSolidLabel,
  asc: BiSortUp,
  desc: BiSortDown,
  listSort: BiSort,
  check: BiCheck,
  repeat: MdEventRepeat,
  trip: FaCarSide,
  pencil: HiPencil,
  caledit: BiSolidCalendarEdit,
  calnew: BiSolidCalendarPlus,
  money: GiTakeMyMoney,
  share: RiShareForwardFill,
  addCircle: IoAddCircle,
  cancel: TbCancel,
  checkCircle: IoIosCheckmarkCircle,
  view: IoMdEye,
  del: MdDelete,
  toDelete: MdDelete,
  gotoPage: RiExternalLinkFill,
  pageNext: IoIosArrowForward,
  pageBack: IoIosArrowBack,
  cross: MdCancel,
  calander_date: FaCalendarDay,
  dashbaord: MdSpaceDashboard,
  add_circle_v2: CgAdd,
  add_plus: IoMdAdd,
  delete_bin: RiDeleteBin5Fill,
  edit: RiEdit2Fill,
};
