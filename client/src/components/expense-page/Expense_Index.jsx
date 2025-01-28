import { useState, useEffect } from "react";
import axios from "axios";
import { PiDotOutlineFill } from "react-icons/pi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import dots from "../../assets/4dots.svg";
import CircleIcon from "../CircleIcon"; // Import your custom icon component

const ExpenseIndex = () => {
  const [entries, setEntries] = useState(null); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data on component mount
    axios
      .get("http://127.0.0.1:8080/api/get-expenseData") // Replace with your API URL
      .then((response) => {
        setEntries(response.data); // Set fetched data to state
        setLoading(false); // Turn off loading
      })
      .catch((err) => {
        setError(err.message); // Handle error
        setLoading(false); // Turn off loading
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (entries.length === 0) return <p>Database is Empty</p>;

  return (
    <>
      {console.log(entries)}

      <div className="bg-white w-[70%] rounded-[20px] px-[4rem] py-[2.5rem]">
        <div className="flex flex-row items-center justify-start pb-2">
          <img className="size-[2rem]" src={dots} alt="dot-icon" />
          <h4 className="pl-2 font-pop-b text-[24px] text-black">Dashboard</h4>
        </div>
        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4 pt-10">
          <h4 className="font-pop-b text-[24px] text-[black]">
            Expense Entries
          </h4>
        </div>

        {entries.map((data) => (
          <div
            key={data._id}
            className="bg-white mb-2 flex flex-row items-center gap-5 rounded-[12px] px-2 py-2"
          >
            <div>
              <CircleIcon iconName={data.subCategory} iconColor={data.primeCategory} />
            </div>
            <div className="grow">
              <div className="flex items-center gap-4 pb-1">
                <p className="pr-2 font-pop-sb text-[20px]">
                  {data.primeCategory}
                </p>
                <p className="flex items-center gap-2 font-pop-m text-[14px]">
                  <span className="rounded-full bg-travel p-[3px]"></span>
                  {data.subCategory}
                </p>
                {data.userCategory && (
                  <p className="flex items-center gap-2 font-pop-m text-[14px]">
                    <span className="rounded-full bg-food p-[3px]"></span>
                    {data.userCategory}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 font-pop-r text-[14px] text-[#919191]">
                <span>{data.entryDate}</span>
                <span>
                  <PiDotOutlineFill />
                </span>
                <span>{data.title}</span>
              </div>
            </div>
            <div className="flex flex-row items-center pr-2 font-pop-sb text-[20px] text-[black]">
              <span>
                <FaIndianRupeeSign />
              </span>
              <span>{data.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpenseIndex;
