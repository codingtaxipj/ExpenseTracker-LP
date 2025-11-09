import moment from "moment";
import { useEffect, useMemo, useState } from "react";

//Shacdn-UI

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import IconCircle from "@/components/IconCircle";

import Flexrow from "@/components/section/flexrow";
import { Icons } from "@/components/icons";
import TooltipStrip from "@/components/strips/tooltip-strip";

import Flexcol from "@/components/section/flexcol";
import { amountFloat } from "@/components/utilityFilter";
import {
  expenseCategories,
  getPrimeCategories,
  getPrimeColor,
  getSubOfPrime,
  incomeCategories,
} from "@/global/categories";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { useDispatch } from "react-redux";
import { deleteExpense, deleteIncome } from "@/redux/slices/transaction-slice";
import { cardBg } from "@/global/style";
import ExpButton from "../buttons/exp-button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm, Controller } from "react-hook-form";
import { ErrorField, FieldLabel, FormField, SelectDate } from "../Forms/Form";
import SelectFilter from "../selectFilter/SelectFilter";

const TransactionListTable = ({ isRecent, isExpesne, entries }) => {
  //Pagination
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentPageItems = entries.slice(start, end);
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);
  //const emptyRows = ITEMS_PER_PAGE - currentPageItems.length;

  const bgColor = isExpesne ? "bg-exp-a3" : "bg-inc-a2";

  const dispatch = useDispatch();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const deleteToast = (ID, userID = 123456) => {
    return new Promise((resolve) => {
      toast.custom((t) => (
        <Flexrow
          className={cn(
            "!text-14px bg-dark-br1 text-slate-1 border-dark-br1 shadow-dark-p2 w-[24rem] items-center gap-2 rounded-lg border px-4 py-2 shadow-md",
          )}
        >
          <Flexcol className="flex-1 gap-0">
            <span className="font-medium">Delete Expense ?</span>
            <span>Do you want to delete ?</span>
          </Flexcol>

          <Flexrow className="w-max justify-end gap-2">
            <ExpButton
              custom_textbtn
              className="bg-ggbg"
              onClick={async () => {
                try {
                  const result = isExpesne
                    ? await dispatch(
                        deleteExpense({ expID: ID, userID }),
                      ).unwrap()
                    : await dispatch(
                        deleteIncome({ incID: ID, userID }),
                      ).unwrap();
                  toast.dismiss(t.id);
                  toast.success("Transaction Deleted !", {
                    description: `Amount : ${result.ofAmount} | Category : ${result.subCategory},${result.primeCategory}`,
                    style: {
                      width: "24rem", // custom width
                    },
                  });
                  resolve(true);
                } catch (error) {
                  toast.error("Operation Failed !", {
                    description: error,
                    style: {
                      width: "24rem", // custom width
                    },
                  });
                  resolve(false);
                }
              }}
            >
              Yes
            </ExpButton>
            <ExpButton
              custom_textbtn
              className="bg-rrbg"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
            >
              No
            </ExpButton>
          </Flexrow>
        </Flexrow>
      ));
    });
  };

  return (
    <>
      <Flexcol className="cursor-default">
        {currentPageItems.map((data) => (
          <TooltipStrip
            key={data._id}
            content={data.isNote ? data.isNote : "No Transaction Note Given"}
          >
            {/** ======== main rectangle box ======== */}
            <Flexrow className={cn("px-5 py-2.5", cardBg)}>
              <Flexrow className="w-max items-center">
                <IconCircle
                  className={"!text-24px rounded-lg"}
                  bgColor={data.primeCategory}
                  setIcon={data.subCategory}
                />
              </Flexrow>
              <Flexcol className="gap-0.5">
                <p className="text-22px font-medium">{data.subCategory}</p>
                <Flexrow className="text-12px w-max gap-2.5">
                  <Flexrow className={"w-max items-center gap-1.25"}>
                    <span
                      className="size-3 rounded-xs"
                      style={{
                        backgroundColor: getPrimeColor(data.primeCategory),
                      }}
                    ></span>
                    {data.primeCategory}
                  </Flexrow>
                  <Flexrow className={"w-max items-center gap-1.25"}>
                    <Icons.dayCal />
                    {moment(data.onDate).format("Do MMM, yyyy")}
                  </Flexrow>
                  <Flexrow className={"w-max items-center gap-1.25"}>
                    {data.isTripExpense && (
                      <>
                        <Icons.trip />
                        {"Trip Expense"}
                      </>
                    )}
                    {data.isReccuringExpense && (
                      <>
                        <Icons.repeat />
                        {"Reccuring Expense"}
                      </>
                    )}
                  </Flexrow>
                </Flexrow>
              </Flexcol>
              <Flexrow className="text-28px w-max items-center gap-1.25 font-bold">
                <Icons.rupee className="text-18px" />
                {amountFloat(data.ofAmount)}
              </Flexrow>
              <Flexrow className="w-max items-center gap-2.5">
                <TooltipStrip content="Edit Record">
                  <ExpButton
                    edit_iconbtn
                    onClick={() => setSelectedTransaction(data)}
                    className={cn(
                      "text-slate-a1",
                      isExpesne ? "bg-exp-aa" : "bg-inc-a0",
                    )}
                  />
                </TooltipStrip>

                <TooltipStrip content="Delete Record">
                  <ExpButton
                    delete_iconbtn
                    className={"bg-error-a1 text-slate-a1"}
                    onClick={() => deleteToast(data._id)}
                  />
                </TooltipStrip>
              </Flexrow>
            </Flexrow>
          </TooltipStrip>
        ))}
      </Flexcol>

      <Dialog
        open={!!selectedTransaction}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedTransaction(null);
          }
        }}
      >
        <DialogContent className="bg-dark-a3 border-dark-a4 [&>button]:hidden">
          <EditForm
            transaction={selectedTransaction}
            isExpesne={isExpesne}
            onClose={() => setSelectedTransaction(null)}
          />
        </DialogContent>
      </Dialog>

      {!isRecent && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={
                  page === 1
                    ? "bg-dark-a3 pointer-events-none cursor-not-allowed"
                    : `text-dark-a1 cursor-pointer ${bgColor}`
                }
              >
                <Icons.pageBack />
              </PaginationPrevious>
            </PaginationItem>

            <PaginationItem className="text-14px px-5">
              Page {page} of {totalPages}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={
                  page === totalPages
                    ? "bg-dark-a3 pointer-events-none cursor-not-allowed"
                    : `text-dark-a1 cursor-pointer ${bgColor}`
                }
              >
                <Icons.pageNext />
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const EditForm = ({ transaction, isExpesne, onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const isTrip = watch("isTripExpense");
  const isRecurring = watch("isReccuringExpense");
  const selectedPrimeCat = watch("primeCategory");
  const [showSubCategoryWarning, setShowSubCategoryWarning] = useState(false);

  const listOfPrimeCats = useMemo(() => {
    return isExpesne
      ? getPrimeCategories(expenseCategories)
      : getPrimeCategories(incomeCategories);
  }, [isExpesne]);

  const listOfSubCat = useMemo(() => {
    return getSubOfPrime(selectedPrimeCat, isExpesne);
  }, [selectedPrimeCat, isExpesne]);

  useEffect(() => {
    if (transaction) {
      reset({
        ...transaction,
        onDate: new Date(transaction.onDate),
        ofAmount: transaction.ofAmount,
      });

      setShowSubCategoryWarning(false);
    }
  }, [transaction, reset]);

  useEffect(() => {
    if (transaction && listOfSubCat.length > 0) {
      if (selectedPrimeCat !== transaction.primeCategory) {
        setValue("subCategory", listOfSubCat[0], { shouldValidate: true });
      }
    }
  }, [listOfSubCat, selectedPrimeCat, setValue, transaction, watch]);

  const onSubmit = async (data) => {
    try {
      console.log("Data Edited", data);
    } catch (error) {
      toast.error("Update Failed", { description: error });
    }
  };

  // Helper for tag buttons
  const toggleTag = (fieldName) => {
    setValue(fieldName, !watch(fieldName), { shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogDescription>
          Make changes to your transaction here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      {/* Form Fields: Titles on left, inputs on right */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4">
        {/* Amount */}
        <FieldLabel label="Amount" />
        <Flexrow className="border-slate-a7 items-center gap-1 border-b">
          <Icons.rupee className="text-sm" />
          <input
            className="inputType-number w-full bg-transparent py-1 outline-none"
            type="number"
            {...register("ofAmount", {
              required: "Amount is required",
              valueAsNumber: true,
            })}
          />
        </Flexrow>
        <ErrorField error={errors.ofAmount} className="col-start-2" />

        {/* Date */}
        <FieldLabel label="Date" />
        <Controller
          name="onDate"
          control={control}
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <SelectDate // Assuming this is your date picker
              onSelect={field.onChange}
              selected={field.value}
            />
          )}
        />
        <ErrorField error={errors.onDate} className="col-start-2" />

        {/* Prime Category */}
        <FieldLabel label="Prime Category" />
        <Controller
          name="primeCategory"
          control={control}
          rules={{ required: "Prime category is required" }}
          render={({ field }) => (
            <SelectFilter
              placeholder="Select Prime Category"
              onValueChange={(value) => {
                field.onChange(value);
                // --- Show warning ---
                setShowSubCategoryWarning(true);
              }}
              list={listOfPrimeCats}
              value={field.value || ""}
            />
          )}
        />
        <ErrorField error={errors.primeCategory} className="col-start-2" />
        {/* --- MODIFICATION: Sub Category Dropdown --- */}
        <FieldLabel label="Category" />
        <Controller
          name="subCategory"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <SelectFilter
              placeholder="Select Sub Category"
              onValueChange={(value) => {
                field.onChange(value);
                // --- Hide warning ---
                setShowSubCategoryWarning(false);
              }}
              list={listOfSubCat} // List is now dynamic based on useMemo
              value={field.value || ""}
            />
          )}
        />

        {/* --- ADDED: Warning Message --- */}
        {showSubCategoryWarning && (
          <p className="text-12px text-rr col-start-2 italic">
            Note: Sub-category was auto-reset. Please confirm selection.
          </p>
        )}
        <ErrorField error={errors.subCategory} className="col-start-2" />

        {/* Note */}
        <FieldLabel label="Note" />
        <textarea
          rows={3}
          className="bg-dark-a5 border-slate-a7 w-full rounded-md border px-3 py-1 outline-none"
          {...register("isNote")}
        />
      </div>

      {/* Tags (as requested) */}
      <FormField>
        <FieldLabel label="Tags" />
        <Flexrow className="gap-2">
          <ExpButton
            type="button"
            onClick={() => toggleTag("isTripExpense")}
            className={cn(
              "text-12px",
              isTrip ? "bg-trip-a2 text-white" : "bg-dark-a5 text-slate-a4",
            )}
          >
            <Icons.trip /> Trip Expense
          </ExpButton>
          <ExpButton
            type="button"
            onClick={() => toggleTag("isReccuringExpense")}
            className={cn(
              "text-12px",
              isRecurring ? "bg-rep-a2 text-white" : "bg-dark-a5 text-slate-a4",
            )}
          >
            <Icons.repeat /> Recurring Expense
          </ExpButton>
        </Flexrow>
      </FormField>

      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <ExpButton
            type="button"
            custom_textbtn
            className="bg-dark-a5 text-slate-a4"
          >
            Cancel
          </ExpButton>
        </DialogClose>
        <ExpButton
          type="submit"
          custom_textbtn
          className={isExpesne ? "bg-exp-a3" : "bg-inc-a2"}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </ExpButton>
      </DialogFooter>
    </form>
  );
};

export default TransactionListTable;

/** 
 * ? OLD CODE FOR TABLE
 * 
 * <tr className="hover:bg-gradBot">
                  <TD className="px-2.5">
                    <IconCircle
                      bgColor={data.primeCategory}
                      setIcon={data.subCategory}
                    />
                  </TD>
                  <TD className="font-medium">{data.subCategory}</TD>
                  <TD>
                    <button className="text-12px text-dim border-br2 rounded-sm border px-2 py-1.25 leading-none">
                      {data.primeCategory}
                    </button>
                  </TD>
                  <TD>
                    <Flexrow className="text-12px text-dim items-center !gap-1.5">
                      <Icons.dayCal />
                      <span>{moment(data.onDate).format("DD/MM/yyyy")}</span>
                    </Flexrow>
                  </TD>

                  <TD className="text-center">
                    <TooltipStrip content="Trip Expense">
                      <ExpButton
                        btnfor="trip"
                        className="!p-1.5"
                        label={<Icons.trip />}
                      />
                    </TooltipStrip>
                  </TD>
                  <TD>
                    <Flexrow className="items-center justify-end !gap-1.5 font-medium">
                      <Icons.rupee /> <span>{data.ofAmount}</span>
                    </Flexrow>
                  </TD>
                  <TD>
                    <Flexrow className="justify-center !gap-2">
                      <TooltipStrip content="Edit Record">
                        <ExpButton
                          btnfor="trip"
                          className="!p-1.5"
                          label={<Icons.pencil />}
                        />
                      </TooltipStrip>
                      <TooltipStrip content="View Record">
                        <ExpButton
                          btnfor="trip"
                          className="!p-1.5"
                          label={<Icons.view />}
                        />
                      </TooltipStrip>
                      <TooltipStrip content="Delete Record">
                        <ExpButton
                          btnfor="trip"
                          className="!p-1.5"
                          label={<Icons.del />}
                        />
                      </TooltipStrip>
                    </Flexrow>
                  </TD>
                </tr>
 */
