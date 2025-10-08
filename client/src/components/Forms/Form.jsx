import moment from "moment";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
// global variables
import { PATH } from "@/router/routerConfig";

//Shacdn-UI
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { toast } from "sonner";

import { Checkbox } from "../ui/checkbox";
import OuterBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import { Icons } from "../icons";
import ExpButton from "../buttons/exp-button";
import {
  expenseCategories,
  getPrimeCategories,
  getSubOfPrime,
  incomeCategories,
} from "@/global/categories";
import Flexrow from "../section/flexrow";
import { useDispatch } from "react-redux";
import {
  insertExpense,
  insertIncome,
  insertRecurringExpense,
} from "@/redux/slices/transaction-slice";
import { PaymentStatus } from "@/global/globalVariables";

/**
 * @function Form
 * @param isExpense
 * @param isIncome
 * @param isRepeat
 * @param isTripV1
 * @returns the form inserts the expense of selected trip
 * @param isTripV2
 * @returns the form asks in which trip user wish to insert trip expense
 */

const Form = ({
  newExpense,
  isExpense,
  isIncome,
  isRepeat,
  isTrip,
  tripID,
}) => {
  const dispatch = useDispatch();

  //NOTE - date label for expense / Income
  const dateLabel =
    (isRepeat && "Bill Generation Date ?") ||
    (isExpense && "Expense Date") ||
    (isTrip && "Trip Expense Date") ||
    (isIncome && "Income Date");

  //NOTE page navigation
  const navigate = useNavigate();
  const location = useLocation();

  // NOTE desengemnting path so that parent path remain constant no matter where my form displays
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

  //NOTE Category states
  const [selectedPrimeCat, setSelectedPrimeCat] = useState(null);
  const [selectedSubCat, setSelectedSubCat] = useState(null);

  // NOTE will handle the selected prime for expense to dsiplay its sub categories
  const handleSelectExpensePrime = (value) => {
    setValue("primeCategory", value, { shouldValidate: true });
    setSelectedPrimeCat(value);
  };
  const handleSelectIncomePrime = () => {
    setValue("primeCategory", "Income", { shouldValidate: true });
    setSelectedPrimeCat("Income");
  };

  //NOTE get prime categories
  const listOfPrimeCats =
    isExpense || isRepeat || isTrip
      ? getPrimeCategories(expenseCategories)
      : getPrimeCategories(incomeCategories);

  //NOTE get sub cat of selected prime cat
  const listOfSubCat =
    isExpense || isTrip || isRepeat
      ? getSubOfPrime(selectedPrimeCat, isExpense || isRepeat || isTrip) || null
      : getSubOfPrime(selectedPrimeCat) || null;

  //NOTE : react from hook initalize
 // At the top of your Form component
const {
  register,
  control, // We will use this for custom components
  handleSubmit,
  reset,
  watch,   // Use watch to get current form values
  formState: { errors },
} = useForm({
  defaultValues: {
    userID: 123456,
    isTypeExpense: isRepeat || isTrip || isExpense ? true : false,
    isTripExpense: isTrip ? true : false,
    isRecurringExpense: isRepeat ? true : false,
    ofTrip: isTrip ? tripID : null,
    ofRecurring: null,
    primeCategory: null, // Add all form fields here
    subCategory: null,
    isRepeatBy: 0,
    lastPaymentDate: null,
  },
});

// Watch for changes to the primeCategory to update the UI
const selectedPrimeCat = watch("primeCategory");

  //NOTE : form handle submit function
  const onSubmit = async (data) => {
    const { isNote, onDate } = data;
    if (!isNote || isNote.trim().length === 0) data.isNote = null;
    data.onDate = moment(onDate).toISOString();

    if (isRepeat) {
      const { lastPaymentDate } = data;
      const today = moment();
      const onDateDiff = today.diff(onDate, "days");
      const onLastDateDiff = today.diff(lastPaymentDate, "days");
      // if daysDiff is + then date is past and - then date is in future
      let status = null;
      if (
        (onDateDiff >= 0 && onLastDateDiff == 0) ||
        (onDateDiff == 0 && lastPaymentDate === undefined)
      ) {
        status = await confirmToast("Success", PaymentStatus.DUE);
      } else if (onDateDiff > 0 && onLastDateDiff < 0) {
        status = await confirmToast("Success", PaymentStatus.UNPAID);
      } else if (
        (onLastDateDiff > 0 && onDateDiff > 0) ||
        (onDateDiff > 0 && lastPaymentDate == undefined)
      ) {
        status = await Promise.resolve(PaymentStatus.OVERDUE);
      } else if (onDateDiff < 0) {
        status = await Promise.resolve(PaymentStatus.UPCOMING);
      }

      data.isRepeatStatus = status;
      data.lastPaymentDate =
        lastPaymentDate === undefined
          ? moment(onDate).toISOString()
          : moment(lastPaymentDate).toISOString();

      await delay(200);
    }

    console.log("data", data);

    try {
      let result;
      if (isRepeat) {
        result = await dispatch(insertRecurringExpense({ data })).unwrap();
      } else if (isExpense || isTrip) {
        result = await dispatch(insertExpense({ data })).unwrap();
      } else if (isIncome) {
        result = await dispatch(insertIncome({ data })).unwrap();
      }

      // If we get to this line, the dispatch was successful.
      // The 'result' variable now holds the new expense/income object.
      toast.success("Added Transaction !", {
        description: `A new entry for Amount ${result.amount} was saved successfully.`, // A generic success message
        action: {
          label: "Ok!",
          onClick: () => reset(),
        },
      });
    } catch (error) {
      // If the dispatch fails (is rejected), this block will run.
      // The 'error' variable contains the message from rejectWithValue().
      toast.error("Operation Failed !", {
        description: error, // 'error' is the message string from your thunk
        action: {
          label: "Try Again",
        },
      });
    }
  };

  //NOTE - form label icon color
  const formLabelIconColor =
    (isExpense && "text-exp-a1") ||
    (isIncome && "text-inc-a1") ||
    (isTrip && "text-trip-a1") ||
    (isRepeat && "text-rep-a1");

  /**==================================================================== */

  const [repeatBy, setRepeatBy] = useState(0);
  const [lastDate, setLastDate] = useState(0);

  const handleRepeat = (index) => {
    if (repeatBy === index) {
      setRepeatBy(0);
      // uncheck if already selected
    } else {
      setRepeatBy(index);
      setValue("isRepeatBy", index, { shouldValidate: true });
    }
  };

  const handleDeadline = (index) => {
    if (lastDate === index) {
      setLastDate(0);
      // uncheck if already selected
    } else {
      setLastDate(index);
    }
  };

  /**==================================================================== */

  return (
    <>
      <div className="text-14px font-medium">
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            /** NOTE [HIDDEN] field to identify type if form is expense or income */
            <input type="hidden" {...register("isTypeExpense")} />
          }

          {/** ANCHOR select form for inc or exp ---------------- */}
          {!isRepeat &&
            !isTrip &&
            newExpense &&
            ((!newExpense && isExpense) || isIncome) && (
              <FormField>
                <div className="flex gap-2">
                  <ExpButton
                    onClick={() => navigateToExpense()}
                    custom_textbtn
                    type="button"
                    className={cn(
                      "w-1/2",
                      isExpense
                        ? "bg-exp-a3 text-dark-a1"
                        : "bg-dark-a5 text-slate-a5 hover:bg-exp-a3 hover:text-dark-a1",
                    )}
                  >
                    Expense Form
                  </ExpButton>
                  <ExpButton
                    onClick={() => navigateToIncome()}
                    custom_textbtn
                    type="button"
                    className={cn(
                      "w-1/2",
                      isIncome
                        ? "bg-inc-a3 text-dark-a1"
                        : "bg-dark-a5 text-slate-a5 hover:bg-inc-a3 hover:text-dark-a1",
                    )}
                  >
                    Income Form
                  </ExpButton>
                </div>
              </FormField>
            )}
          {/**ANCHOR ##END: select form for inc or exp ---------------- */}

          {/**ANCHOR AMOUNT Field ---------------- */}
          <FormField>
            <FieldLabel
              iconColor={formLabelIconColor}
              htmlFor="Amount"
              label="Amount"
            />
            <div className="border-slate-a7 inline-flex w-full items-center border-b-1 font-bold">
              <Icons.rupee className="text-18px" />
              <input
                className="inputType-number text-24px w-full rounded-md border-none px-3 py-1 outline-none"
                type="number"
                onBlur={"This cannot be empty"}
                {...register("ofAmount", {
                  required: "* Please provide a transaction amount",
                  valueAsNumber: true,
                })}
              />
              <span className="text-18px">INR</span>
            </div>
            <ErrorField error={errors.ofAmount} />
          </FormField>
          {/**ANCHOR ##END: AMOUNT Field ---------------- */}

          {/**ANCHOR NOTE Field ---------------- */}
          <FormField>
            <FieldLabel
              iconColor={formLabelIconColor}
              htmlFor="Note"
              label="Transaction Note"
            />
            <textarea
              className="border-dark-a3 bg-dark-a3 focus:bg-dark-a2 hover:bg-dark-a2 w-full rounded-md border p-2 outline-none"
              placeholder="Transaction Note..."
              {...register("isNote")}
            />
          </FormField>
          {/**ANCHOR ##END: DESCRIPTION Field ---------------- */}

          {/**ANCHOR DATE Field ---------------- */}
          <FormField>
            <FieldLabel
              iconColor={formLabelIconColor}
              htmlFor="Date"
              label={dateLabel}
            />
            <SelectDate valVar="onDate" setValue={setValue}></SelectDate>
          </FormField>
          {/**ANCHOR ##END: DATE Field ---------------- */}

          {/**ANCHOR Repeat by month or year Field ---------------- */}
          {isRepeat && (
            <>
              <input
                type="hidden"
                {...register("isRepeatBy", {
                  required: "* Please select a repeat type",
                })}
              />
              <input type="hidden" {...register("isRepeatStatus")} />
              <FormField>
                <FieldLabel
                  iconColor={formLabelIconColor}
                  htmlFor="Repeat Type"
                  label={"Expense Recurring Type"}
                />
                <Flexrow className={"text-16px"}>
                  <Flexrow className={"w-max items-center gap-2"}>
                    <Checkbox
                      className={
                        "data-[state=checked]:bg-rep-a3 border-slate-a7 hover:cursor-pointer"
                      }
                      checked={repeatBy === 1}
                      onCheckedChange={() => handleRepeat(1)}
                    />
                    <span>By Month</span>
                  </Flexrow>
                  <Flexrow className={"w-max items-center gap-2"}>
                    <Checkbox
                      className={
                        "data-[state=checked]:bg-rep-a3 border-slate-a7 hover:cursor-pointer"
                      }
                      checked={repeatBy === 2}
                      onCheckedChange={() => handleRepeat(2)}
                    />
                    <span>By Year</span>
                  </Flexrow>
                </Flexrow>
                <ErrorField error={errors.isRepeatType} />
              </FormField>
              <FormField>
                <FieldLabel
                  iconColor={formLabelIconColor}
                  htmlFor="Repeat Type"
                  label={"Bill has Paymnet Deadline ?"}
                />
                <Flexrow className={"text-16px"}>
                  <Flexrow className={"w-max items-center gap-2"}>
                    <Checkbox
                      className={
                        "data-[state=checked]:bg-rep-a3 border-slate-a7 hover:cursor-pointer"
                      }
                      checked={lastDate === 0}
                      onCheckedChange={() => handleDeadline(0)}
                    />
                    <span>No</span>
                  </Flexrow>
                  <Flexrow className={"w-max items-center gap-2"}>
                    <Checkbox
                      className={
                        "data-[state=checked]:bg-rep-a3 border-slate-a7 hover:cursor-pointer"
                      }
                      checked={lastDate === 1}
                      onCheckedChange={() => handleDeadline(1)}
                    />
                    <span>Yes</span>
                  </Flexrow>
                </Flexrow>
              </FormField>
              {lastDate === 1 && (
                <FormField>
                  <FieldLabel
                    iconColor={formLabelIconColor}
                    htmlFor="Date"
                    label={"Bill Deadline Date ?"}
                  />
                  <SelectDate
                    valVar="lastPaymentDate"
                    setValue={setValue}
                  ></SelectDate>
                </FormField>
              )}
            </>
          )}
          {/**ANCHOR ##END: Repeat by month or year Field ---------------- */}

          {/**ANCHOR MAIN CATEGORY Field ---------------- */}
          <FormField>
            <FieldLabel
              iconColor={formLabelIconColor}
              htmlFor="primeCategory"
              label="Main Category"
            />
            <OuterBar>
              <SelectCard
                isExpense={isExpense || isTrip || isRepeat}
                title={"Select Main Category"}
              >
                {(isExpense || isTrip || isRepeat) && (
                  <SelectFilter
                    placeholder={"Select"}
                    onValueChange={handleSelectExpensePrime}
                    list={listOfPrimeCats}
                  ></SelectFilter>
                )}
                {isIncome && (
                  <SelectFilter
                    placeholder={"Select"}
                    onValueChange={handleSelectIncomePrime}
                    list={listOfPrimeCats}
                  ></SelectFilter>
                )}
              </SelectCard>
            </OuterBar>

            <input
              type="hidden"
              {...register("primeCategory", {
                required: "* PLease Select a Prime Category",
              })}
            />

            <ErrorField error={errors.primeCategory} />
          </FormField>

          {/* ANCHOR ##END: MAIN CATEGORY Field ---------------- */}

          {/**ANCHOR SUB CATEGORY Field ---------------- */}
          <FormField>
            <FieldLabel
              iconColor={formLabelIconColor}
              htmlFor="subCategory"
              label=" Sub Category"
            />
            {selectedPrimeCat === null && (
              <span>Select a main category first ...</span>
            )}
            {listOfSubCat !== null && (
              <>
                <div className="inline-flex flex-wrap gap-2">
                  {listOfSubCat.map((buttons) => (
                    <ExpButton
                      custom_textbtn
                      onClick={() => {
                        setValue("subCategory", buttons, {
                          shouldValidate: true,
                        });
                        setSelectedSubCat(buttons);
                      }}
                      type="button"
                      key={buttons}
                      className={cn(
                        selectedSubCat === buttons
                          ? (isExpense && "bg-exp-a3 text-dark-a1") ||
                              (isIncome && "bg-inc-a3 text-dark-a1") ||
                              (isTrip && "bg-trip-a4 text-dark-a1") ||
                              (isRepeat && "bg-rep-a3 text-dark-a1")
                          : "bg-dark-a3 text-slate-a5 hover:text-dark-a1",
                        (isExpense && "hover:bg-exp-a3") ||
                          (isIncome && "hover:bg-inc-a3") ||
                          (isTrip && "hover:bg-trip-a4") ||
                          (isRepeat && "hover:bg-rep-a3"),
                      )}
                    >
                      {buttons}
                    </ExpButton>
                  ))}
                </div>
              </>
            )}

            <input
              type="hidden"
              {...register("subCategory", {
                required: "* Sub Category is Required",
              })}
            />

            <ErrorField error={errors.subCategory} />
          </FormField>
          {/**ANCHOR ##END: SUB CATEGORY Field ---------------- */}

          {/**ANCHOR SUBMIT & CANCEL Buttons ---------------- */}
          <FormField className="items-end">
            <div className="flex gap-2">
              <ExpButton
                type="submit"
                className={cn(
                  "text-dark-a1",
                  (isExpense && "bg-exp-a3") ||
                    (isIncome && "bg-inc-a3") ||
                    (isTrip && "bg-trip-a4") ||
                    (isRepeat && "bg-rep-a3"),
                )}
                custom_textbtn
              >
                Add Now
              </ExpButton>

              <ExpButton
                onClick={() => {
                  reset();
                  handleCancel();
                }}
                type="button"
                custom_textbtn
                className={cn("bg-error-a1")}
              >
                Cancel
              </ExpButton>
            </div>
          </FormField>
          {/**ANCHOR ##END: SUBMIT & CANCEL Buttons ---------------- */}
        </form>
      </div>
    </>
  );
};

export default Form;

export const SelectDate = ({ setValue, valVar }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "border-dark-a3 bg-dark-a3 hover:bg-dark-a2 focus:bg-dark-a2 text-slate-a2 w-full justify-between border text-left",
              !date && "text-muted-foreground",
            )}
          >
            {date ? date.toLocaleDateString() : "Select a date"}
            <Icons.dayCal />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            fromYear={new Date().getFullYear() - 5}
            toYear={new Date().getFullYear() + 5}
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setValue(valVar, selectedDate);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export const FormField = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col gap-2 py-4 ${className}`}>{children}</div>
  );
};
export const FieldLabel = ({ htmlFor, label, iconColor = "text-white" }) => {
  return (
    <label htmlFor={htmlFor} className="inline-flex items-center gap-2">
      <Icons.formlabel className={`${iconColor}`} />
      {label}
    </label>
  );
};

export const ErrorField = ({ error }) => {
  return <>{error && <p className="text-12px text-rr">{error.message}</p>}</>;
};

// Helper: Promise-based toast confirmation (with JSX)
const confirmToast = (title, statusB) => {
  return new Promise((resolve) => {
    toast.custom((t) => (
      <div className="rounded-lg border bg-white p-4 shadow-lg">
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-gray-600">Have you paid the bill?</p>
        <div className="mt-3 flex gap-2">
          <button
            className="rounded bg-green-500 px-3 py-1 text-white"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(PaymentStatus.PAID);
            }}
          >
            Yes
          </button>
          <button
            className="rounded bg-red-500 px-3 py-1 text-white"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(statusB);
            }}
          >
            No
          </button>
        </div>
      </div>
    ));
  });
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
