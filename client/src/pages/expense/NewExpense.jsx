import Form from "@/components/Forms/Form";
import Flexrow from "@/components/section/flexrow";

const NewExpense = () => {
  return (
    <>
      <Flexrow>
        <Flexrow className={"w-1/2"}>Image</Flexrow>
        <Form newExpense isExpense />
      </Flexrow>
    </>
  );
};

export default NewExpense;
