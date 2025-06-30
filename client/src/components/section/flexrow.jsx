const Flexrow = ({ children, className = "" }) => {
  return (
    <>
      <div className={`flex w-full flex-row flex-wrap gap-5 ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Flexrow;
