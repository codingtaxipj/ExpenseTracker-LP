const OuterBar = ({ children }) => {
  return (
    <div className="bg-gradBot shadow-shadowBlack border-br1 border flex rounded-lg py-1 shadow-md">
      {children}
    </div>
  );
};

export default OuterBar;
