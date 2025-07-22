import Flexrow from "@/components/section/flexrow";
import TypewriterAni from "../../components/TypewriterAni";
import Flexcol from "@/components/section/flexcol";
import ExpButton from "@/components/buttons/expButton";

const HomeIndex = () => {
  return (
    <>
      <Flexrow>
        <TypewriterAni />
      </Flexrow>

      <Flexcol className="pt-10">
        <ExpButton btnfor="expense" label={"add expense"} />
        <ExpButton btnfor="income" label={"add income"} />
        <ExpButton btnfor="trip" label={"add trip"} />
        <ExpButton btnfor="repeatexpense" label={"add recuring Expense"} />
        <ExpButton btnfor="budget" label={"add budget"} />
        <ExpButton btnfor="cancel" label={"cancel"} />
        <ExpButton btnfor="success" label={"success"} />
      </Flexcol>
    </>
  );
};

export default HomeIndex;
