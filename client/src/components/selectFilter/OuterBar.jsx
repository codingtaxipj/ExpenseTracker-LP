const OuterBar = ({ children }) => {
  return (
    <div className="bg-gradBot shadow-shadowBlack border-br1 border flex rounded-lg py-1 gap-4 shadow-md w-max px-2.5">
      {children}
    </div>
  );
};

export default OuterBar;
