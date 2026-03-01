import React from "react";

const Wrapper = ({ className, children }) => {
  return (
    <div className={`max-w-xl w-100 md:w-md h-screen md:h-auto   p-8 rounded-xl shadow ${className} ` }>
      {children}
    </div>
  );
};

export default Wrapper;
