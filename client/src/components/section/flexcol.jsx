const Flexcol = ({ children, className = "" }) => {
  return (
    <>
      <div className={`flex w-full flex-col flex-wrap gap-5 ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Flexcol;
