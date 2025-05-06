import TypewriterAni from "../../components/TypewriterAni";

const HomeIndex = () => {
  return (
    <>
      <div className="[&::-webkit-scrollbar-track]:bg-grey-border [&::-webkit-scrollbar-thumb]:bg-grey-hover max-h-screen w-3/4 overflow-y-auto rounded-md p-10 text-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4">
          <h4 className="font-pop-b text-[24px]">Today</h4>
        </div>

        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4">
          <h4 className="font-pop-b text-[24px]">Analysis</h4>
        </div>
        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4">
          <h4 className="font-pop-b text-[24px]">Trip Expenses</h4>
        </div>

        <div className="mt-10 flex justify-center">
          <TypewriterAni />
        </div>
      </div>
    </>
  );
};

export default HomeIndex;
