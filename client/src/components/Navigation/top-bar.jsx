import moment from "moment";
import ExpButton from "../buttons/exp-button";
import { FaCalendarDay, FaClock, FaPowerOff } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { IoMdSettings } from "react-icons/io";

const style = "!text-12px w-max  space-x-0.75 p-1";

export const ActiveDate = () => {
  const currentDate = moment().format("DD MMMM, YYYY");
  return (
    <ExpButton custom_textbtn className={cn(style, "cursor-default")}>
      <FaCalendarDay />
      <span>{currentDate}</span>
    </ExpButton>
  );
};

export const ActiveClock = () => {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ExpButton custom_textbtn className={cn(style, "cursor-default")}>
      <FaClock />
      <span> {time.format("hh:mm A")}</span>
    </ExpButton>
  );
};

export const PageTitle = ({ nav, activeBtn }) => {
  return (
    <ExpButton custom_textbtn className={cn(style, "cursor-default")}>
      <Icons.window />
      {nav.find((n) => n.link === activeBtn)?.name}
    </ExpButton>
  );
};

export const UserLogout = () => {
  return (
    <ExpButton custom_textbtn className={style}>
      <FaPowerOff />
      Logout
    </ExpButton>
  );
};

export const UserSettings = () => {
  return (
    <ExpButton custom_textbtn className={style}>
    <IoMdSettings />
      Settings
    </ExpButton>
  );
};
