import React from "react";
import { Colors } from "../../colors";

const SubHeader = ({ children }) => {
  return (
    <h3
      style={{
        color: Colors.black,
        padding: 20,
        margin: 0,
        fontFamily: "Constantia",
        fontSize: 20,
        ["@media (max-width:956px)"]: {
          fontSize: 15,
        },
      }}
    >
      {children}
    </h3>
  );
};

export default SubHeader;
