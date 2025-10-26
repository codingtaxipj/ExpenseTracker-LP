// --- Components ---

import Flexcol from "@/components/section/flexcol";
import Flexrow from "@/components/section/flexrow";

import ActiveBudgetCard from "@/components/cards/active-budget-card";

import BudgetTable from "@/components/table/budget-table";

import ExpButton from "@/components/buttons/exp-button";

import useBudgetConfig, { getBudgetExpPercent } from "@/hooks/useBudgetConfig";

import { Spinner } from "flowbite-react";
import { useDispatch } from "react-redux";
import { deleteBudget } from "@/redux/slices/budget-slice";
import { CurrentMonth, CurrentYear } from "@/utilities/calander-utility";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const BudgetIndex = () => {
  //NOTE - BUDGET CONFIG
  const { Budget, BudgetLoading, BudgetError, BudgetByMonth } =
    useBudgetConfig();
  const dispatch = useDispatch();
  console.log("BM", BudgetByMonth);

  let isAnyBudgetExist = BudgetByMonth.some((b) => b.amount > 0);

  const handleDeleteBudget = () => {
    const data = {
      userID: 123456,
      year: CurrentYear(),
      month: CurrentMonth(),
      amount: 0,
    };
    return new Promise((resolve) => {
      toast.custom((t) => (
        <Flexrow
          className={cn(
            "!text-14px bg-dark-br1 text-slate-1 border-dark-br1 shadow-dark-p2 w-[24rem] items-center gap-2 rounded-lg border px-4 py-2 shadow-md",
          )}
        >
          <Flexcol className="flex-1 gap-0">
            <span className="font-medium">Delete Budget ?</span>
            <span>Do you want to delete ?</span>
          </Flexcol>

          <Flexrow className="w-max justify-end gap-2">
            <ExpButton
              custom_textbtn
              className="bg-ggbg"
              onClick={async () => {
                toast.dismiss(t);
                try {
                  await dispatch(deleteBudget({ data })).unwrap();
                  toast.success("Success!", {
                    description: "Your budget has been deleted.",
                    action: {
                      label: "Ok!",
                      onClick: () => {},
                    },
                  });
                } catch (error) {
                  toast.error("Operation Failed", {
                    description: error, // 'error' is the clean error message from rejectWithValue
                    action: {
                      label: "Ok!",
                      onClick: () => {},
                    },
                  });
                }
              }}
            >
              Yes
            </ExpButton>
            <ExpButton
              custom_textbtn
              className="bg-rrbg"
              onClick={() => {
                toast.dismiss(t);
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

  // NOTE: 1. Handle the loading state first
  if (BudgetLoading) {
    return (
      <Flexrow className="h-full items-center justify-center">
        <Spinner
          className="text-slate-a3 fill-exp-a1"
          size="lg"
          aria-label="expense page loader"
        />
      </Flexrow>
    );
  }
  // NOTE: 2. Handle the error state next
  if (BudgetError) {
    return (
      <>
        <Flexrow className="h-full items-center justify-center">
          ERROR : {BudgetError}
        </Flexrow>
      </>
    );
  }
  // NOTE: 3. Handle the "no data" state
  if (!Budget || Budget.length === 0 || !isAnyBudgetExist) {
    // This gives the user a clear message if there's nothing to show
    return "Set Budget";
  }
  // NOTE: 4. If all checks pass, render the main content
  return (
    <>
      <Flexrow>
        <Flexcol className="items-center">
          <ActiveBudgetCard />
          <Flexrow className="justify-center">
            <ExpButton as="div" newBudget_textbtn />
            <ExpButton as="div" editBudget_textbtn />
            <ExpButton
              onClick={handleDeleteBudget}
              className={"bg-error-a1 text-slate-a1"}
              delete_iconbtn
            />
          </Flexrow>
        </Flexcol>
        <Flexcol>
          <BudgetTable />
        </Flexcol>
      </Flexrow>
    </>
  );
};

export default BudgetIndex;
