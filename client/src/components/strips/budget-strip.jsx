import { useForm } from "react-hook-form";
import ExpButton from "../custom-ui/expButton";
import { FieldLabel, FormField } from "../Forms/Form";
import { Icons } from "../icons";
import Flexrow from "../section/flexrow";
import { amountInteger } from "../utilityFilter";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import TooltipStrip from "./tooltip-strip";
import { Separator } from "@radix-ui/react-dropdown-menu";

const BudgetStrip = ({ className = "" }) => {
  //NOTE default userID
  const userID = 12345;
  //NOTE budget state
  const [userBudget, setUserBudget] = useState(null);

  //NOTE fetch budget os user from DB on load
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/budget/get-data/${userID}`,
        );
        const budgetArray = response.data;
        const prevBudget = budgetArray[1];
        const latestBudget = budgetArray[0];

        if (budgetArray.length === 0) {
          setUserBudget(null);
        } else if (budgetArray.length === 1) {
          setUserBudget(budgetArray[0].budgetAmount);
        } else {
          if (moment(latestBudget.activeFrom).isAfter(moment(), "month"))
            setUserBudget(prevBudget.budgetAmount);
          else setUserBudget(latestBudget.budgetAmount);
        }
      } catch (error) {
        if (error.response) {
          console.error("Validation Error:", error.response.data.errors);
          alert(
            error.response.data?.errors?.[0]?.msg ||
              error.response.data?.message ||
              "Fetching Budget failed.",
          );
        } else {
          console.error("Unknown Axios Error:", error.message);
          alert("Network or unknown error.");
        }
      }
    };
    if (userID) fetchBudget();
  }, [userID]);

  //NOTE date o decide when the budget will be active
  const activeDate = moment().toISOString();
  const nextMonthDate = moment().add(1, "month").startOf("month").format();

  //NOTE react-form-hook
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userID: 123456,
      activeFrom: activeDate,
    },
  });

  //NOTE form on submit
  const onSubmit = async (data) => {
    if (userBudget !== null) {
      data.activeFrom = moment(nextMonthDate).toDate();
    }
    console.log("date is :: ", moment(nextMonthDate).toDate());

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/budget/add-data",
        data,
      );

      toast.success("Success", {
        description: response.data.message,
        action: {
          label: "Ok!",
          onClick: () => reset(),
        },
      });
    } catch (error) {
      if (error.response) {
        console.error("Validation Error:", error.response.data.errors);
        alert(
          error.response.data?.errors?.[0]?.msg ||
            error.response.data?.message ||
            "Budget Submission failed.",
        );
      } else {
        console.error("Unknown Axios Error:", error.message);
        alert("Network or unknown error.");
      }
    }
  };
  return (
    <>
      <div
        className={`text-16 flex h-7 flex-row items-center gap-1 rounded-md font-medium ${className}`}
      >
        <span className="mr-1.5">
          <Icons.calc className={`text-budget`} />
        </span>

        {/** if budget exists */}
        {userBudget !== null && (
          <>
            <Flexrow className="items-center !gap-2">
              <h4>Monthly Budget To Spend</h4>
              <Separator
                orientation="vertical"
                className="bg-91 mx-2 h-4 w-px"
              />
              <span className="italic">INR</span>
              <h4>{amountInteger(userBudget)}</h4>
              <Separator
                orientation="vertical"
                className="bg-91 mx-2 h-4 w-px"
              />
              <TooltipStrip content="Edit Current Budget">
                <ExpButton isIcon btnfor="budget" label={<Icons.caledit />} />
              </TooltipStrip>
              <TooltipStrip content="Set New Budget">
                <ExpButton isIcon btnfor="budget" label={<Icons.calnew />} />
              </TooltipStrip>
            </Flexrow>
          </>
        )}

        {/** if no budget found */}

        {userBudget === null && (
          <>
            <h4>No Monthly Budget is Set</h4>
            <span className="bg-91 mx-2 h-full w-[0.5px]"></span>
            <Drawer>
              <DrawerTrigger>
                <ExpButton
                  btnfor="budget"
                  className="font-normal"
                  label="Set Budget"
                />
              </DrawerTrigger>
              <DrawerContent
                className={`from-gradBot to-gradTop bg-gradient-to-t`}
              >
                <DrawerHeader>
                  <Flexrow className="justify-center text-white">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="w-160 min-w-100"
                    >
                      <FormField>
                        <FieldLabel
                          iconColor={"text-white"}
                          htmlFor="Budget Amount"
                          label="Budget Amount"
                        />
                        <div className="inline-flex w-full items-center border-b-1 border-white font-bold">
                          <Icons.rupee className="text-[18px]" />
                          <input
                            className="inputType-number text-24 w-full rounded-md border-none px-3 py-1 outline-none"
                            type="number"
                            {...register("budgetAmount", {
                              required: "* Please provide a Budget Amount",
                              valueAsNumber: true,
                            })}
                          />
                          <span className="text-[18px]">INR</span>
                        </div>
                      </FormField>
                      <FormField className="items-end">
                        <div className="flex gap-2">
                          <ExpButton
                            type="submit"
                            btnfor="budget"
                            label={"Set Budget"}
                          />
                          <DrawerClose>
                            <ExpButton
                              type="button"
                              btnfor="cancel"
                              label={"Cancel"}
                            />
                          </DrawerClose>
                        </div>
                      </FormField>
                    </form>
                  </Flexrow>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </div>
    </>
  );
};

export default BudgetStrip;
