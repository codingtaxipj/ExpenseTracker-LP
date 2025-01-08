import dots from "../../assets/4dots.svg";
import CircleIcon from "../CircleIcon";
import category from "../../assets/lib/icondata.json";

const AllCategories = () => {
  let cat = JSON.parse(JSON.stringify(category));
  return (
    <>
      <div className="h-full overflow-y-scroll px-[4rem] py-[2.5rem]">
        <div className="flex flex-row items-center justify-start pb-2">
          <img className="size-[2rem]" src={dots} alt="dot-icon" />
          <h4 className="pl-2 font-pop-b text-[24px] text-black">
            Category & Icons Dashboard
          </h4>
        </div>

        <div>
          {Object.keys(cat).map((key) => (
            <div className="pb-10" key={key}>
              <div className="mb-2 flex flex-row items-center justify-start border-b-[1px] border-[#e7e7e7] pb-4 pt-10">
                <h4 className="font-pop-b text-[24px] text-[black]">
                  {cat[key].thisCategoryTitle} Icons
                </h4>
              </div>

              <div className="flex flex-wrap">
                {Object.keys(cat[key])
                  .filter(
                    (sc) =>
                      !sc.includes("thisCategoryTitle") &&
                      !sc.includes("thisBgColor"),
                  )
                  .map((innerKey) => (
                    <div
                      key={innerKey}
                      className="flex w-[15rem] items-center gap-2 pr-5 pt-5"
                    >
                      <CircleIcon iconName={cat[key][innerKey]} />
                      {console.log(cat[key][innerKey])}
                      <h4>
                        <span className="font-pop-sb text-[16px]">
                          {" "}
                          {cat[key][innerKey]}{" "}
                        </span>{" "}
                        <br />{" "}
                        <span className="font-pop-m text-[14px]">ICON</span>{" "}
                      </h4>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCategories;
