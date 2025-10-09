import Flexrow from "@/components/section/flexrow";
import TypewriterAni from "../../components/TypewriterAni";

const HomeIndex = () => {
  return (
    <>
      <Flexrow>
        <TypewriterAni />
      </Flexrow>

      <Flexrow className="gap-10 pt-5">
        <div className="flex grid-cols-2 flex-col gap-5">
          <Flexrow>
            <div className="bg-exp-b size-15 rounded-lg"></div>
            <span className="text-exp-t">This is Expense text color</span>
          </Flexrow>
          <Flexrow>
            <div className="bg-inc-b size-15 rounded-lg"></div>
            <span className="text-inc-t">This is Income text color</span>
          </Flexrow>
          <Flexrow>
            <div className="bg-trip-b size-15 rounded-lg"></div>
            <span className="text-trip-b">This is Trip text color</span>
          </Flexrow>
          <Flexrow>
            <div className="bg-repeat-b size-15 rounded-lg"></div>
            <span className="text-repeat-b">This is Reccuring text color</span>
          </Flexrow>
          <Flexrow>
            <div className="bg-budget-b size-15 rounded-lg"></div>
            <span className="text-budget-b">This is Budget text color</span>
          </Flexrow>
        </div>
        <div className="flex grid-cols-2 flex-col gap-5">
          <Flexrow>
            <div className="bg-exp-b size-15 rounded-lg"></div>
            <span className="text-exp-b">This is Expense text color</span>
          </Flexrow>
          <Flexrow>
            <div className="bg-inc-b size-15 rounded-lg"></div>
            <span className="text-inc-b">This is Income text color</span>
          </Flexrow>
          <Flexrow>
            <div className="bg-trip-b size-15 rounded-lg"></div>
            <span className="text-trip-b">This is Trip text color</span>
          </Flexrow>
          <Flexrow>
            <div className="bg-repeat-b size-15 rounded-lg"></div>
            <span className="text-repeat-b">This is Reccuring text color</span>
          </Flexrow>
          <Flexrow>
            <div className="bg-budget-b size-15 rounded-lg"></div>
            <span className="text-budget-b">This is Budget text color</span>
          </Flexrow>
        </div>
      </Flexrow>
    </>
  );
};

export default HomeIndex;
