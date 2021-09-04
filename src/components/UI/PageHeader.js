import React from "react";
import { pageHeaderStyle } from './styles/styles';

const PageHeader = ({ children }) => {
  const classes = pageHeaderStyle();

  return <h1 className={classes.header}>{children}</h1>;
};

export default PageHeader;
