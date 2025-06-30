const FlexrowStrip = ({ className = "", children }) => {
  return (
    <div
      className={`text-14 from-gradBot to-gradTop shadow-shadowBlack border-br1 flex flex-row items-center justify-center gap-1.25 rounded-md border bg-gradient-to-t px-4 py-1 font-medium shadow ${className}`}
    >
      {children}
    </div>
  );
};

export default FlexrowStrip;
