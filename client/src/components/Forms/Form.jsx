import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// --- Global Imports ---
import { PATH } from "@/router/routerConfig";
import { PaymentStatus } from "@/global/globalVariables";
import {
  expenseCategories,
  getPrimeCategories,
  getSubOfPrime,
  incomeCategories,
} from "@/global/categories";

// --- Redux Imports ---
import {
  insertExpense,
  insertIncome,
  insertRecurringExpense,
} from "@/redux/slices/transaction-slice";

// --- Component Imports ---
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "../ui/checkbox";
import OuterBar from "../selectFilter/SelectBar";
import SelectCard from "../selectFilter/SelectCard";
import SelectFilter from "../selectFilter/SelectFilter";
import { Icons } from "../icons";
import ExpButton from "../buttons/exp-button";
import Flexrow from "../section/flexrow";
import { useState } from "react";

const Form = ({
  newExpense,
  isExpense,
  isIncome,
  isRepeat,
  isTrip,
  tripID,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * =============================================================
   * * ANCHOR react-hook-form Setup
   * All form state (including selections) and validation is managed here.
   * ==============================================================
   */
  const {
    register,
    control, // Use Controller for custom/UI library components
    handleSubmit,
    reset,
    watch, // Watch for changes to form fields to update the UI
    setValue, // Used for custom button-based inputs
    formState: { errors },
  } = useForm({
    defaultValues: {
      userID: 123456,
      isTypeExpense: !!(isRepeat || isTrip || isExpense),
      isTripExpense: !!isTrip,
      isRecurringExpense: !!isRepeat,
      ofTrip: isTrip ? tripID : null,
      ofRecurring: null,
      primeCategory: null,
      subCategory: null,
      onDate: new Date(),
      isRepeatBy: null,
      lastPaymentDate: null,
      isNote: "",
      ofAmount: "",
    },
  });

  // Watch for changes to these fields to reactively update the UI.
  const selectedPrimeCat = watch("primeCategory");
  const selectedSubCat = watch("subCategory");
  const repeatBy = watch("isRepeatBy");

  /**
   * =============================================================
   * * ANCHOR Form Submission Logic
   * ==============================================================
   */

  const onSubmit = async (data) => {
    // --- Data Sanitization ---
    data.onDate = moment(data.onDate).toISOString();
    if (!data.isNote || data.isNote.trim().length === 0) {
      data.isNote = null;
    }

    // --- Complex Logic for Recurring Status ---
    if (isRepeat) {
      const status = await determineRepeatStatus(data);
      if (status === null) return; // User cancelled the confirmation toast
      data.isRepeatStatus = status;
      data.lastPaymentDate = data.lastPaymentDate
        ? moment(data.lastPaymentDate).toISOString()
        : moment(data.onDate).toISOString();
    }

    try {
      let result;
      if (isRepeat) {
        result = await dispatch(insertRecurringExpense({ data })).unwrap();
      } else if (isExpense || isTrip) {
        result = await dispatch(insertExpense({ data })).unwrap();
      } else if (isIncome) {
        result = await dispatch(insertIncome({ data })).unwrap();
      }

      toast.success("Transaction Added!", {
        description: `A new entry for ${result.ofAmount} was saved successfully.`,
        action: { label: "Ok!", onClick: () => reset() },
      });
      handleCancel(); // Navigate back on success
    } catch (error) {
      toast.error("Operation Failed!", {
        description: error,
        action: { label: "Try Again" },
      });
    }
  };

  /**
   * =============================================================
   * * ANCHOR UI Logic & Navigation
   * ==============================================================
   */
  const desegmentPath = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    segments.pop();
    return "/" + segments.join("/");
  };
  const handleCancel = () => navigate(desegmentPath());

  const dateLabel =
    (isRepeat && "Bill Generation Date") ||
    (isTrip && "Trip Expense Date") ||
    (isExpense && "Expense Date") ||
    (isIncome && "Income Date");
  const formLabelIconColor =
    (isExpense && "text-exp-a1") ||
    (isIncome && "text-inc-a1") ||
    (isTrip && "text-trip-a1") ||
    (isRepeat && "text-rep-a1");

  const listOfPrimeCats =
    isExpense || isRepeat || isTrip
      ? getPrimeCategories(expenseCategories)
      : getPrimeCategories(incomeCategories);
  const listOfSubCat = getSubOfPrime(
    selectedPrimeCat,
    isExpense || isRepeat || isTrip,
  );

  /**==================================================================== */

  return (
    <div className="text-14px font-medium">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* --- Form Switcher for Expense/Income --- */}
        {!isRepeat && !isTrip && newExpense && (
          <div className="flex gap-2 py-4">
            <ExpButton
              onClick={() => navigate(desegmentPath() + "/" + PATH.addExpense)}
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
              onClick={() => navigate(desegmentPath() + "/" + PATH.addIncome)}
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
        )}

        {/* --- Amount Field --- */}
        <FormField>
          <FieldLabel iconColor={formLabelIconColor} label="Amount" />
          <div className="border-slate-a7 inline-flex w-full items-center border-b-1 font-bold">
            <Icons.rupee className="text-18px" />
            <input
              className="inputType-number text-24px w-full rounded-md border-none px-3 py-1 outline-none"
              type="number"
              {...register("ofAmount", {
                required: "* Amount is required",
                valueAsNumber: true,
                min: {
                  value: 0.01,
                  message: "* Amount must be greater than 0",
                },
              })}
            />
            <span className="text-18px">INR</span>
          </div>
          <ErrorField error={errors.ofAmount} />
        </FormField>

        {/* --- Note Field --- */}
        <FormField>
          <FieldLabel iconColor={formLabelIconColor} label="Transaction Note" />
          <textarea
            className="border-dark-a3 bg-dark-a3 focus:bg-dark-a2 hover:bg-dark-a2 w-full rounded-md border p-2 outline-none"
            placeholder="Transaction Note..."
            {...register("isNote")}
          />
        </FormField>

        {/* --- Date Field --- */}
        <FormField>
          <FieldLabel iconColor={formLabelIconColor} label={dateLabel} />
          <Controller
            name="onDate"
            control={control}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <SelectDate onSelect={field.onChange} selected={field.value} />
            )}
          />
          <ErrorField error={errors.onDate} />
        </FormField>

        {/* --- Recurring Expense Fields --- */}
        {isRepeat && (
          <>
            <FormField>
              <FieldLabel
                iconColor={formLabelIconColor}
                label="Expense Recurring Type"
              />
              <Flexrow className={"text-16px"}>
                {[1, 2].map((value) => (
                  <Flexrow key={value} className={"w-max items-center gap-2"}>
                    <Checkbox
                      className="data-[state=checked]:bg-rep-a3 border-slate-a7 hover:cursor-pointer"
                      checked={repeatBy === value}
                      onCheckedChange={() =>
                        setValue(
                          "isRepeatBy",
                          repeatBy === value ? null : value,
                          { shouldValidate: true },
                        )
                      }
                    />
                    <span>By {value === 1 ? "Month" : "Year"}</span>
                  </Flexrow>
                ))}
              </Flexrow>
              <input
                type="hidden"
                {...register("isRepeatBy", {
                  required: "* Please select a repeat type",
                })}
              />
              <ErrorField error={errors.isRepeatBy} />
            </FormField>

            <FormField>
              <FieldLabel
                iconColor={formLabelIconColor}
                label="Bill has a Payment Deadline?"
              />
              <Controller
                name="lastPaymentDate"
                control={control}
                render={({ field }) => (
                  <SelectDate
                    onSelect={field.onChange}
                    selected={field.value}
                    placeholder="Optional: Select deadline"
                  />
                )}
              />
            </FormField>
          </>
        )}

        {/* --- Main Category --- */}
        <FormField>
          <FieldLabel iconColor={formLabelIconColor} label="Main Category" />
          <OuterBar>
            <SelectCard
              isExpense={isExpense || isTrip || isRepeat}
              title={"Select Main Category"}
            >
              <Controller
                name="primeCategory"
                control={control}
                rules={{ required: "* Please Select a Main Category" }}
                render={({ field }) => (
                  <SelectFilter
                    placeholder="Select"
                    onValueChange={field.onChange}
                    list={listOfPrimeCats}
                    value={field.value}
                  />
                )}
              />
            </SelectCard>
          </OuterBar>
          <ErrorField error={errors.primeCategory} />
        </FormField>

        {/* --- Sub Category --- */}
        {selectedPrimeCat && (
          <FormField>
            <FieldLabel iconColor={formLabelIconColor} label="Sub Category" />
            <div className="inline-flex flex-wrap gap-2">
              {listOfSubCat?.map((button) => (
                <ExpButton
                  type="button"
                  key={button}
                  onClick={() =>
                    setValue("subCategory", button, { shouldValidate: true })
                  }
                  className={cn(
                    selectedSubCat === button
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
                  {button}
                </ExpButton>
              ))}
            </div>
            <input
              type="hidden"
              {...register("subCategory", {
                required: "* Sub Category is Required",
              })}
            />
            <ErrorField error={errors.subCategory} />
          </FormField>
        )}

        {/* --- Submit & Cancel Buttons --- */}
        <FormField className="items-end">
          <div className="flex gap-2">
            <ExpButton
              type="submit"
              className={cn(
                "text-dark-a1",
                formLabelIconColor.replace("text-", "bg-"),
              )}
            >
              Add Now
            </ExpButton>
            <ExpButton
              type="button"
              onClick={handleCancel}
              className="bg-error-a1"
            >
              Cancel
            </ExpButton>
          </div>
        </FormField>
      </form>
    </div>
  );
};

export default Form;

/**
 * =============================================================
 * * ANCHOR Helper Components & Functions
 * ==============================================================
 */
// --- Custom Date Picker Component ---
export const SelectDate = ({
  selected,
  onSelect,
  placeholder = "Select a date",
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "border-dark-a3 bg-dark-a3 hover:bg-dark-a2 focus:bg-dark-a2 text-slate-a2 w-full justify-between border text-left",
            !selected && "text-muted-foreground",
          )}
        >
          {selected ? moment(selected).format("LL") : placeholder}
          <Icons.dayCal />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          fromYear={new Date().getFullYear() - 5}
          toYear={new Date().getFullYear() + 5}
          selected={selected}
          onSelect={(date) => {
            onSelect(date);
            setOpen(false);
          }}
          captionLayout="dropdown"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

// --- Form Layout Components ---
export const FormField = ({ children, className = "" }) => (
  <div className={`flex flex-col gap-2 py-4 ${className}`}>{children}</div>
);

export const FieldLabel = ({ label, iconColor = "text-white" }) => (
  <label className="inline-flex items-center gap-2">
    <Icons.formlabel className={iconColor} />
    {label}
  </label>
);

export const ErrorField = ({ error }) => (
  <>{error && <p className="text-12px text-rr">{error.message}</p>}</>
);

// --- Helper for Recurring Status Logic ---
const determineRepeatStatus = async ({ onDate, lastPaymentDate }) => {
  const today = moment();
  const onDateDiff = today.diff(moment(onDate), "days");
  const onLastDateDiff = lastPaymentDate
    ? today.diff(moment(lastPaymentDate), "days")
    : null;

  if (onDateDiff < 0) {
    return PaymentStatus.UPCOMING;
  }
  if (onDateDiff >= 0 && (onLastDateDiff === 0 || lastPaymentDate === null)) {
    return await confirmToast(
      "Bill Due",
      "Is the bill for this period paid?",
      PaymentStatus.DUE,
    );
  }
  if (onDateDiff > 0 && onLastDateDiff < 0) {
    return await confirmToast(
      "Bill Unpaid",
      "Is the bill for this period paid?",
      PaymentStatus.UNPAID,
    );
  }
  if (onDateDiff > 0 && (onLastDateDiff > 0 || lastPaymentDate === null)) {
    return PaymentStatus.OVERDUE;
  }
  return null;
};

// --- Promise-based Confirmation Toast ---
const confirmToast = (title, description, statusIfUnpaid) => {
  return new Promise((resolve) => {
    toast.custom((t) => (
      <div className="rounded-lg border bg-white p-4 shadow-lg">
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
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
              resolve(statusIfUnpaid);
            }}
          >
            No
          </button>
          <button
            className="rounded bg-gray-300 px-3 py-1 text-black"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  });
};
