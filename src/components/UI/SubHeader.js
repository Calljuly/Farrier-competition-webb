import React from "react";
import { subHeaderStyle } from './styles/styles';

const SubHeader = ({ children }) => {
  const classes = subHeaderStyle();
  return (
    <h3
      className={classes.header}
    >
      {children}
    </h3>
  );
};

export default SubHeader;
