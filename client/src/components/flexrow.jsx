import React from "react";

const Flexrow = ({ children }) => {
  return (
    <>
      <div className="flex w-full flex-row gap-5"> {children}</div>
    </>
  );
};

export default Flexrow;
