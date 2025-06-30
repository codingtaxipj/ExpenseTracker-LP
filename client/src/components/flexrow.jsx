import React from "react";

const Flexrow = ({ children, className = "" }) => {
  return (
    <>
      <div className={`flex w-full flex-row gap-5 ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Flexrow;
