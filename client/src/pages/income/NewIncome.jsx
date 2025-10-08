import Form from "@/components/Forms/Form";
import Flexrow from "@/components/section/flexrow";

const NewIncome = () => {
  return (
    <>
      <Flexrow>
        <Flexrow className={"w-1/2"}>Image</Flexrow>
        <Flexrow className={"w-1/2"}>
          <Form newIncome isIncome />
        </Flexrow>
      </Flexrow>
    </>
  );
};

export default NewIncome;
