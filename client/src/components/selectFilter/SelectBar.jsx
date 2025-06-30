const SelectBar = ({ children }) => {
  return (
    <div className="bg-gradBot shadow-shadowBlack border-br1 flex w-max gap-4 rounded-lg border px-2.5 py-1 shadow-md">
      {children}
    </div>
  );
};

export default SelectBar;
