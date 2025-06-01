const OuterBar = ({ children }) => {
  return (
    <div className="bg-grey-hover flex-max flex flex-row gap-1 rounded-md px-1.5 py-1 items-center">
      {children}
    </div>
  );
};

export default OuterBar;
