import React from "react";

const SectionOuterFlexcol = ({ children }) => {
  return (
    <>
      <div className="flex w-full flex-col gap-5 px-10 pb-30">{children}</div>
    </>
  );
};

export default SectionOuterFlexcol;
