import moment from "moment";
import capitalize from "capitalize";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// global variables
import { PATH } from "@/router/routerConfig";
import { expenseCategories } from "@/global/icon-data";
//React-icons
import { PiTagSimpleFill } from "react-icons/pi";
import { FaIndianRupeeSign } from "react-icons/fa6";
//Shacdn-UI
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Form = ({ formToDisplay }) => {
  //page navigation
  const navigate = useNavigate();
  const location = useLocation();
  // desengemnting path so that parent path remain constant no matter where my form displays
  const desegmentPath = () => {
    const currentPath = location.pathname;
    const segments = currentPath.split("/").filter(Boolean);
    segments.pop();
    const parentPath = "/" + segments.join("/");
    return parentPath;
  };
  const handleCancel = () => {
    const goToPath = desegmentPath();
    navigate(goToPath);
  };
  const navigateToIncome = () => {
    const Path = desegmentPath();
    const incomePath = Path + "/" + PATH.addIncome;
    navigate(incomePath);
  };
  const navigateToExpense = () => {
    const Path = desegmentPath();
    const incomePath = Path + "/" + PATH.addExpense;
    navigate(incomePath);
  };

  //state
  const [selectedPrimeValue, setSelectedPrimeValue] = useState();
  const [selectedSubCats, setSeletedSubCats] = useState(false);
  const [date, setDate] = useState();

  //prime category
  const primeCategoriesVals = Object.values(expenseCategories).map(
    (category) => category.thisCategoryTitle,
  );

  //sub cat on prime category selection
  const getSubCategoriesVals = (titleToMatch) => {
    if (titleToMatch === "Income")
      return [
        "Salary",
        "Salary Bonus",
        "Part-Time Job",
        "Freelance Work",
        "Reselling",
        "Rental Income",
        "Service Provided",
        "Loan Repaid",
        "Prize Money",
        "Loan Taken",
      ];

    const matchedObj = Object.values(expenseCategories).find(
      (obj) => obj.thisCategoryTitle === titleToMatch,
    );

    if (!matchedObj) return null;

    const cleanedObj = Object.entries(matchedObj).reduce(
      (acc, [key, value]) => {
        if (key !== "thisCategoryTitle") {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );

    return cleanedObj;
  };
  const SubCategoriesVals = getSubCategoriesVals(selectedPrimeValue);

  //NOTE : react from hook initalize
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      formTimeStamp: moment().format(),
      entryDate: moment().format(),
      isFormExpense: formToDisplay === PATH.addIncome ? false : true,
    },
  });
  //NOTE : form handle submit function
  const onSubmit = async (data) => {
    const { title, description, userCategory } = data;
    if (!title || title.trim().length === 0) data.title = null;
    if (!description || description.trim().length === 0)
      data.description = null;
    if (!userCategory || userCategory.trim().length === 0)
      data.userCategory = null;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/expense/add-data",
        data,
      );
      alert(response.data.message);
      reset();
      setDate(null);
      setSeletedSubCats(false);
      setSelectedPrimeValue(null);
    } catch (error) {
      console.error(error);
      const errorMeaage = error.response.data.message || "Submittion Error";
      alert(errorMeaage);
    }
  };
  return (
    <>
      <div className="w-2xl text-sm font-medium">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* check Field (hidden)(form field to identify type of form) */}
          <input type="hidden" {...register("isFormExpense")} />

          {/* ---------------- *ANCHOR Top Bar To select Form to Display ---------------- */}
          <div className="mb-5 flex w-full gap-2">
            <button
              onClick={() => navigateToExpense()}
              type="button"
              className={
                formToDisplay === PATH.addExpense
                  ? "bg-expense w-1/2 cursor-pointer rounded-md px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
                  : "hover:bg-expense w-1/2 cursor-pointer rounded-md bg-black px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
              }
            >
              Expense
            </button>
            <button
              onClick={() => navigateToIncome()}
              type="button"
              className={
                formToDisplay === PATH.addIncome
                  ? "bg-income w-1/2 cursor-pointer rounded-md px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
                  : "hover:bg-income w-1/2 cursor-pointer rounded-md bg-black px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
              }
            >
              Income
            </button>
          </div>
          {/* ---------------- *NOTE ##END: Top Bar To select Form to Display ---------------- */}
          {/* ---------------- *ANCHOR AMOUNT Field ---------------- */}
          <div className="mt-4 flex w-full flex-col items-start gap-2 font-bold">
            <label htmlFor="Amount" className="inline-flex items-center gap-2">
              <PiTagSimpleFill />
              Amount
            </label>
            <div className="inline-flex w-full items-center border-b-2">
              <span className="text-[18px]">
                <FaIndianRupeeSign />
              </span>
              <input
                className="inputType-number w-full rounded-md border-none px-3 py-1 text-[24px] outline-none"
                type="number"
                onBlur={"This cannot be empty"}
                {...register("amount", {
                  required: "* Amount cannot be empty",
                  valueAsNumber: true,
                })}
              />
              <span className="text-[18px]">INR</span>
            </div>
          </div>
          {errors.amount && (
            <p className="pt-2 text-[12px] text-[red]">
              {errors.amount.message}
            </p>
          )}
          {/* ----------------*NOTE ##END: AMOUNT Field ---------------- */}
          {/* ---------------- *ANCHOR TITLE Field ---------------- */}
          <div className="mt-4 flex w-full flex-col items-start gap-2 text-[14px]">
            <label htmlFor="Title" className="inline-flex items-center gap-2">
              <PiTagSimpleFill />
              Title
            </label>
            <input
              type="text"
              {...register("title", {})}
              className="focus-visible:border-ring w-full rounded-md border px-3 py-1 shadow-xs outline-none focus-visible:ring-[1px] focus-visible:ring-gray-200"
            />
          </div>

          {/* ---------------- *NOTE ##END: TITLE Field ---------------- */}
          {/* ---------------- *ANCHOR DESCRIPTION Field ---------------- */}
          <div className="mt-4 flex w-full flex-col items-start gap-2 text-[14px]">
            <label
              htmlFor="Description"
              className="inline-flex items-center gap-2"
            >
              <PiTagSimpleFill />
              Description
            </label>
            <textarea
              className="focus-visible:border-ring w-full rounded-md border px-3 py-1 shadow-xs outline-none focus-visible:ring-[1px] focus-visible:ring-gray-200"
              {...register("description", {})}
            />
          </div>
          {/* ---------------- *NOTE ##END: DESCRIPTION Field ---------------- */}
          {/* ---------------- *ANCHOR DATE Field ---------------- */}
          <div className="mt-4 flex grow flex-col items-start gap-2 text-[14px]">
            <label htmlFor="Date" className="inline-flex items-center gap-2">
              <PiTagSimpleFill />
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start bg-transparent text-left hover:bg-transparent hover:text-white",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setValue("entryDate", selectedDate, {
                      shouldValidate: true,
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <input
              type="hidden"
              {...register("entryDate", {
                required: "* This cannot be empty",
                valueAsDate: true,
              })}
            />
            {/* Date Field (hidden)(form filled timestamp) */}
            <input
              type="hidden"
              {...register("formTimeStamp", {
                valueAsDate: true,
              })}
            />
          </div>

          {/* ---------------- *NOTE ##END: DATE Field ---------------- */}
          {/* ---------------- *ANCHOR MAIN CATEGORY Selection Field ---------------- */}
          <div className="mt-4 flex grow flex-col items-start gap-2 text-[14px]">
            <label
              htmlFor="primeCategory"
              className="inline-flex items-center gap-2"
            >
              <PiTagSimpleFill /> Main Category
            </label>

            <Select
              value={selectedPrimeValue}
              onValueChange={(value) => {
                setValue("primeCategory", value);
                setSelectedPrimeValue(value);
              }}
            >
              <SelectTrigger className="focus-visible:border-ring w-full focus-visible:ring-[1px] focus-visible:ring-gray-200">
                <SelectValue placeholder="Select a value..." />
              </SelectTrigger>
              <SelectContent>
                {formToDisplay === PATH.addIncome && (
                  <SelectItem value="Income">Income</SelectItem>
                )}

                {formToDisplay === PATH.addExpense &&
                  primeCategoriesVals.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("primeCategory", {
                required: "*This cannot be empty",
              })}
            />
            {errors.primeCategory && (
              <p className="pt-2 text-[12px] text-[red]">
                {errors.primeCategory.message}
              </p>
            )}
          </div>
          {/* ---------------- *NOTE ##END: MAIN CATEGORY Selection Field ---------------- */}

          {/* ---------------- *ANCHOR SUB CATEGORY Selection Field ---------------- */}
          <div className="mt-4 flex w-full flex-col items-start gap-3">
            {SubCategoriesVals === null && (
              <label className="inline-flex items-center gap-2">
                <PiTagSimpleFill /> Select a main category first ...
              </label>
            )}
            {SubCategoriesVals !== null && (
              <>
                <label
                  htmlFor="subCategory"
                  className="inline-flex items-center gap-2"
                >
                  <PiTagSimpleFill />
                  Sub Category
                </label>
                <div className="inline-flex grow flex-wrap gap-2 pb-1">
                  {Object.values(SubCategoriesVals).map((buttons) => (
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
                        formToDisplay === PATH.addExpense
                          ? selectedSubCats === buttons
                            ? "bg-expense cursor-pointer rounded-md px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
                            : "hover:bg-expense cursor-pointer rounded-md bg-black px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
                          : selectedSubCats === buttons
                            ? "bg-income cursor-pointer rounded-md px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
                            : "hover:bg-income cursor-pointer rounded-md bg-black px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
                      }
                    >
                      {capitalize(buttons)}
                    </button>
                  ))}
                </div>
              </>
            )}
            <input
              type="hidden"
              {...register("subCategory", {
                required: "* Select a Sub Category",
              })}
            />
            {!errors.primeCategory
              ? errors.subCategory && (
                  <p className="pt-2 text-[12px] text-[red]">
                    {errors.subCategory.message}
                  </p>
                )
              : ""}
          </div>

          {/* ---------------- *NOTE ##END: SUB CATEGORY Selection Field ---------------- */}

          {/* ---------------- *ANCHOR USER GIVEN CATEGORY Field ---------------- */}
          <div className="mt-4 flex w-full items-center gap-4">
            <label
              htmlFor="userCategory"
              className="inline-flex min-w-max items-center gap-2"
            >
              <PiTagSimpleFill />
              Other Category <span className="text-[12px]">(Optional)</span>
            </label>
            <input
              type="text"
              {...register("userCategory", {})}
              className="focus-visible:border-ring w-full rounded-md border px-3 py-1 shadow-xs outline-none focus-visible:ring-[1px] focus-visible:ring-gray-200"
            />
          </div>
          {/* ---------------- *NOTE ##END: USER GIVEN CATEGORY Field ---------------- */}
          {/* ---------------- *ANCHOR SUBMIT AND CANCEL Field ---------------- */}
          <div className="mt-10 flex w-full flex-row justify-end gap-2">
            <button
              type="submit"
              className={
                formToDisplay === PATH.addExpense
                  ? "bg-expense cursor-pointer rounded-md px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
                  : "bg-income cursor-pointer rounded-md px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
              }
            >
              Add Now
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                handleCancel();
              }}
              className="cursor-pointer rounded-md bg-[#da0707] px-5 py-1 text-sm font-medium shadow-xs disabled:cursor-not-allowed disabled:opacity-80"
            >
              Cancel
            </button>
          </div>
          {/* ----------------*NOTE ##END: SUBMIT AND CANCEL Field ---------------- */}
        </form>
      </div>
    </>
  );
};

export default Form;
