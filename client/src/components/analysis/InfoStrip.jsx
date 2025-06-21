import { Icons } from "../icons";
import { amountInteger, percentSigned } from "../utilityFilter";

const InfoStrip = ({ color, amount, date = "Jun" }) => {
  return (
    <>
      <div className="from-gradBot to-gradTop shadow-shadowBlack border-br1 text-14 flex h-7 flex-row items-center gap-1 rounded-md border bg-gradient-to-t px-3 py-1.75 font-medium shadow-md">
        <span className={`${color} size-3 rounded-full mr-1`}></span>
        <h4>{date}</h4>
        <span className="bg-91 mx-2 h-full w-[0.5px]"></span>
        <span className="text-[12px]">
          <Icons.rupee />
        </span>
        <h4>{amountInteger(amount * 200)}</h4>
        <span className="bg-91 mx-2 h-full w-[0.5px]"></span>

        <span className="text-gg flex items-center gap-1">
          {percentSigned(25) + " %"} <Icons.graphup />
        </span>
      </div>
    </>
  );
};

export default InfoStrip;
