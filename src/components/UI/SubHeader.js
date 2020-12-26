import React from "react";

const SubHeader = ({ children }) => {
  return (
    <h3
      style={{
        padding: " 20px 20px 20px 10px",
        fontFamily: "Constantia",
      }}
    >
      {children}
    </h3>
  );
};

export default SubHeader;
