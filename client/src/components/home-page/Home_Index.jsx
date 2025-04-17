import TypewriterAni from "../TypewriterAni";

const Home_Index = () => {
  return (
    <>
      <div className="w-[70%] overflow-y-scroll rounded-[20px] bg-white px-[4rem] py-[2.5rem]">
        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4">
          <h4 className="font-pop-b text-[24px] text-[black]">Today</h4>
        </div>

        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4">
          <h4 className="font-pop-b text-[24px] text-[black]">Analysis</h4>
        </div>
        <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4">
          <h4 className="font-pop-b text-[24px] text-[black]">Trip Expenses</h4>
        </div>

        <div className="mt-10 flex justify-center">
          <TypewriterAni />
        </div>
      </div>
    </>
  );
};

export default Home_Index;
