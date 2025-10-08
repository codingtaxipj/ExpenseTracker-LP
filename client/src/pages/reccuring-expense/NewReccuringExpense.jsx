import Form from "@/components/Forms/Form";
import Flexrow from "@/components/section/flexrow";

const NewReccuringExpense = () => {
  return (
    <>
      <Flexrow>
        <Flexrow className={"w-1/2"}>Image</Flexrow>
        <Flexrow className={"w-1/2"}>
          <Form newExpense isReccuring />
        </Flexrow>
      </Flexrow>
    </>
  );
};

export default NewReccuringExpense;
