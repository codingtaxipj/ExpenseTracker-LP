import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import moment from "moment";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { ErrorField, FieldLabel, FormField } from "../Forms/Form";
import Flexrow from "../section/flexrow";
import { Icons } from "../icons";
import SubmitBtn from "../buttons/text-btns/submit-btn";
import { useDispatch } from "react-redux";
import { insertBudget } from "@/redux/slices/budget-slice";

const BudgetPop = ({ children, isEdit, isNew, isSet, activeBudget }) => {
  const dispatch = useDispatch();
  //NOTE default userID
  const userID = 12345;
  const date = moment();
  const month = date.month() === 11 ? 0 : date.month() + 1;
  const year = date.month() === 11 ? date.year() + 1 : date.year();

  //NOTE react-form-hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userID: userID,
      year: year,
      month: month,
    },
  });

  //NOTE form on submit
  const onSubmit = async (form) => {
    const mode = (isEdit && "update") || ((isNew || isSet) && "new");
    const data =
      (isEdit && {
        userID: activeBudget.userID,
        year: activeBudget.year,
        month: activeBudget.month,
        amount: form.amount,
      }) ||
      ((isNew || isSet) && form);

    const result = await dispatch(insertBudget({ mode, data })).unwrap();

    if (result.success) {
      toast.success("Success", {
        description: result.message,
        action: {
          label: "Ok!",
          onClick: () => reset(),
        },
      });
    } else if (!result.success) {
      toast.error("Success", {
        description: result.message,
        action: {
          label: "Ok!",
          onClick: () => reset(),
        },
      });
    }
  };
  return (
    <>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className={`from-gradBot to-gradTop bg-gradient-to-t`}>
          <DrawerHeader>
            {isEdit && (
              <DrawerTitle className={"text-budget italic"}>
                NOTE : editing current budget will change your Budget Analysis
              </DrawerTitle>
            )}
            {isNew && (
              <DrawerTitle className={"text-budget italic"}>
                NOTE : New Budget will be applied from the start of next Month
              </DrawerTitle>
            )}
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
                  <Flexrow className="items-center gap-0 border-b-1 border-white font-bold">
                    <Icons.rupee className="text-[18px]" />
                    <input
                      className="inputType-number text-24px w-full rounded-md border-none px-3 py-1 outline-none"
                      type="number"
                      {...register("amount", {
                        required: "* Please provide a Budget Amount",
                        valueAsNumber: true,
                      })}
                    />
                    <span className="text-[18px]">INR</span>
                  </Flexrow>
                </FormField>
                <Flexrow>
                  <ErrorField error={errors.amount} />
                </Flexrow>
                <Flexrow className={"items-center justify-end gap-2"}>
                  <SubmitBtn className={"bg-budget"} type="submit" />
                  <DrawerClose>
                    <div className="bg-rr flex cursor-pointer items-center gap-1.5 rounded-md px-5 py-1">
                      <span onClick={() => reset()} className="text-14px">
                        Cancel
                      </span>
                    </div>
                  </DrawerClose>
                </Flexrow>
              </form>
            </Flexrow>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BudgetPop;
