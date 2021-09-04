import React from "react";
import { pStyle } from './styles/styles';

const P = ({ children, orange }) => {
  const classes = pStyle();
  return <p className={orange ? classes.orange : classes.p}>{children}</p>;
};

export default P;
