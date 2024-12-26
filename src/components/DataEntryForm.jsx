import { useForm } from "react-hook-form";
import { FaSortDown } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiTagSimpleFill } from "react-icons/pi";
import category from "../assets/lib/icondata.json";

import { useState } from "react";
import capitalize from "capitalize";
import moment from "moment";

const DataEntryForm = () => {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isIncomeOrExpense: 0,
      Date: moment().format("YYYY-MM-DD"),
      Time: moment().format("LT"),
      userCategory: "",
      subCategory: "",
      Title: "",
      Description: "",
    },
  });

  const [subCats, setSubCats] = useState(false);
  function displaySubCategiries(primeCategory) {
    const a = toSetSubCat[primeCategory];
    const c = Object.values(cat[a]).splice(2);
    setSubCats(c);
  }
  const [selectedSubCats, setSeletedSubCats] = useState(false);
  const [activeForm, setActiveForm] = useState("expense");

  let cat = JSON.parse(JSON.stringify(category));
  const primeCategoriesVals = Object.keys(cat).map(
    (head) => cat[head].thisCategoryTitle,
  );

  const catKeysASvalue = Object.keys(cat);
  const toSetSubCat = primeCategoriesVals.reduce(
    (key, primeCategoriesVals, index) => {
      key[primeCategoriesVals] = catKeysASvalue[index];
      return key;
    },
    {},
  );

  function onSubmit(data) {
    data.Date = moment(data.Date).format("DD/MM/YYYY");
    console.log(data);
  }

  return (
    <>
      <div className="p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-[32rem]">
          <div className="mb-5 flex w-full">
            <input type="hidden" {...register("isIncomeOrExpense", {})} />
            <button
              onClick={() =>
                setActiveForm((set) => {
                  set = "expense";
                  setValue("isIncomeOrExpense", 0);
                  return set;
                })
              }
              type="button"
              className={
                (activeForm === "expense"
                  ? "bg-expense text-[white]"
                  : "hover:bg-expense bg-black text-[white]") +
                " " +
                "mr-[1px] w-full rounded-l-md px-4 py-1"
              }
            >
              Expense
            </button>
            <button
              onClick={() =>
                setActiveForm((set) => {
                  set = "income";
                  setValue("isIncomeOrExpense", 1);
                  return set;
                })
              }
              type="button"
              className={
                (activeForm === "income"
                  ? "bg-income text-[white]"
                  : "hover:bg-income bg-black text-[white]") +
                " " +
                "w-full rounded-r-md px-4 py-1"
              }
            >
              Income
            </button>
          </div>

          <div className="px-4">
            <div className="flex flex-col items-start font-pop-b text-[32px]">
              <label>Amount</label>
              <div className="inline-flex items-center border-b-2">
                <span className="text-[18px]">
                  <FaIndianRupeeSign />
                </span>
                <input
                  type="number"
                  onBlur={"This cannot be empty"}
                  {...register("Amount", {
                    required: "* This cannot be empty",
                    valueAsNumber: true,
                  })}
                  className="inputType-number = w-full bg-[#ffffff] px-2 py-1 outline-none"
                />
                <span className="text-[18px]">INR</span>
              </div>
              {errors.Amount && (
                <p className="pt-2 font-pop-i text-[12px] text-[red]">
                  {errors.Amount.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex w-full flex-col items-start gap-2 font-pop-m text-[14px]">
              <label htmlFor="Title" className="inline-flex items-center gap-2">
                <PiTagSimpleFill />
                Title
              </label>
              <input
                type="text"
                {...register("Title", {})}
                className="bg-formInput w-full rounded-md border border-[#d1d1d1] px-2 py-1 shadow-sm focus:border focus:outline-none focus:ring-1 focus:ring-[#9e9e9e]"
              />
            </div>

            <div className="mt-4 flex w-full flex-col items-start gap-2 font-pop-m text-[14px]">
              <label
                htmlFor="Description"
                className="inline-flex items-center gap-2"
              >
                <PiTagSimpleFill />
                Description
              </label>
              <textarea
                {...register("Description", {})}
                className="bg-formInput w-full rounded-md border border-[#d1d1d1] px-2 py-1 shadow-sm focus:border focus:outline-none focus:ring-1 focus:ring-[#9e9e9e]"
              />
            </div>

            <div className="mt-4 flex w-full gap-6">
              <div className="flex grow flex-col items-start gap-2 font-pop-m text-[14px]">
                <label
                  htmlFor="Date"
                  className="inline-flex items-center gap-2"
                >
                  <PiTagSimpleFill />
                  Date
                </label>
                <input
                  type="date"
                  {...register("Date", {
                    valueAsDate: true,
                  })}
                  className="bg-formInput w-full rounded-md border border-[#d1d1d1] px-2 py-1 shadow-sm focus:border focus:outline-none focus:ring-1 focus:ring-[#9e9e9e]"
                />
              </div>
              <input type="hidden" {...register("Time", {})} />
              <div className="flex grow flex-col items-start gap-2 font-pop-m text-[14px]">
                <label
                  htmlFor="primeCategory"
                  className="inline-flex items-center gap-2"
                >
                  <PiTagSimpleFill /> Main Category
                </label>
                <div className="relative w-full">
                  <select
                    defaultValue="NAN"
                    className="slectInput-arrow bg-formInput w-full rounded-md border border-[#d1d1d1] px-4 py-1 shadow-sm focus:border focus:outline-none focus:ring-1 focus:ring-[#9e9e9e]"
                    {...register("primeCategory", {
                      onChange: (e) => displaySubCategiries(e.target.value),
                      validate: (fieldValue) =>
                        fieldValue === "NAN" ? "* Select a Valid Value" : true,
                    })}
                  >
                    <option value={"NAN"} disabled>
                      Select a Category...
                    </option>
                    {primeCategoriesVals.map((cats) => (
                      <option key={cats} value={cats}>
                        {cats}
                      </option>
                    ))}
                  </select>
                  <FaSortDown className="absolute inset-y-[.3rem] right-3 text-black" />
                </div>
                {errors.primeCategory && (
                  <p className="pt-2 font-pop-i text-[12px] text-[red]">
                    {errors.primeCategory.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex w-full flex-col items-start gap-3 font-pop-m text-[14px]">
              {!subCats && (
                <label className="inline-flex items-center gap-2">
                  <PiTagSimpleFill /> Select a main category first ...
                </label>
              )}
              {subCats && (
                <>
                  <label
                    htmlFor="subCategory"
                    className="inline-flex items-center gap-2"
                  >
                    <PiTagSimpleFill />
                    Sub Category
                  </label>
                  <input
                    type="hidden"
                    {...register("subCategory", {
                      required: "* Select a Sub Category",
                    })}
                  />
                  <div className="inline-flex grow flex-wrap gap-2 pb-1">
                    {subCats.map((buttons) => (
                      <button
                        type="button"
                        key={buttons}
                        onClick={() => {
                          setSeletedSubCats(buttons);
                          setValue("subCategory", buttons, {
                            shouldValidate: true,
                          });
                        }}
                        className={
                          selectedSubCats === buttons
                            ? "rounded-md bg-travel px-4 py-1 text-[white]"
                            : "rounded-md bg-black px-4 py-1 text-[white] hover:bg-travel"
                        }
                      >
                        {capitalize(buttons)}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {errors.subCategory && (
                <p className="pt-2 font-pop-i text-[12px] text-[red]">
                  {errors.subCategory.message}
                </p>
              )}
            </div>

            <div className="mt-4 flex w-full items-center gap-4 font-pop-m text-[14px]">
              <label
                htmlFor="userCategory"
                className="inline-flex items-center gap-2"
              >
                <PiTagSimpleFill />
                3rd Category <span className="text-[12px]">(Optional)</span>
              </label>
              <input
                type="text"
                {...register("userCategory", {})}
                className="bg-formInput grow rounded-md border border-[#d1d1d1] px-2 py-1 shadow-sm focus:border focus:outline-none focus:ring-1 focus:ring-[#9e9e9e]"
              />
            </div>

            <div className="mt-10 flex w-full justify-end">
              <button
                type="submit"
                className="bg-expense mr-[1px] w-[10rem] rounded-l-md px-4 py-1 text-[white]"
              >
                Add Expense
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="w-[10rem] rounded-r-md bg-[#da0707] px-4 py-1 text-[white]"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default DataEntryForm;
