import React from "react";
import { buttonContainerStyle } from './styles/styles';

const ButtonContainer = ({ children }) => {
  const classes = buttonContainerStyle();
  return <div className={classes.container}>{children}</div>;
};

export default ButtonContainer;
